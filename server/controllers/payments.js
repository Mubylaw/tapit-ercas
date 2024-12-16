const crypto = require("crypto");
const axios = require("axios");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Event = require("../models/Event");
const User = require("../models/User");
const uuid = require("uuid");

// @desc    Initialize a transaction
// @route   POST /api/v1/payments
// @access  Private
exports.initializeTransaction = asyncHandler(async (req, res, next) => {
  const options = JSON.stringify({
    customerEmail: req.body.email,
    customerName: req.body.name,
    amount: req.body.price * 100,
    currency: "NGN",
    paymentMethods: "card,bank-transfer,ussd,qrcode",
    paymentReference: uuid.v4(),
    metadata: {
      merchant: req.body.email,
    },
    redirectUrl: "https://tapit-ercas.onrender.com/success",
  });

  // Initialize Transaction
  const initalize_transaction_url =
    "https://api.ercaspay.com/api/v1/payment/initiate";
  const transaction = await axios(initalize_transaction_url, {
    method: "POST",
    data: options,
    headers: {
      Authorization: `Bearer ${process.env.ECRS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  // Change this to res.redirect
  res.status(200).json({
    success: true,
    data: transaction.data,
  });
});

// @desc    Create a bank account
// @route   POST /api/v1/payments/account
// @access  Private / admin
exports.createAccount = asyncHandler(async (req, res, next) => {
  const options = JSON.stringify({
    kyc: { nin: req.body.nin, bvn: req.body.bvn },
    customer: { name: req.body.name, email: req.body.email },
    account_name: req.body.name,
    permanent: true,
    bank_code: "000",
    account_reference: uuid.v4(),
  });

  const transaction_url = `https://api.ercaspay.com/api/v1/virtual-bank-account`;
  const account = await axios(transaction_url, {
    method: "POST",
    data: options,
    headers: {
      Authorization: `Bearer ${process.env.ECRS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  res.status(200).json({
    success: true,
    data: account.data,
  });
});

// @desc    update a bank account
// @route   PUT /api/v1/payments/account
// @access  Private / admin
exports.updateAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("accountReference");

  const options = JSON.stringify({
    kyc: { nin: req.body.nin, bvn: req.body.bvn },
    account_reference: user.accountReference,
  });

  const transaction_url = `https://api.ercaspay.com/api/v1/virtual-bank-account/${user.accountReference}`;
  const account = await axios(transaction_url, {
    method: "PATCH",
    data: options,
    headers: {
      Authorization: `Bearer ${process.env.ECRS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  res.status(200).json({
    success: true,
    data: account.data,
  });
});

// @desc    get a bank account
// @route   GET /api/v1/payments/account
// @access  Private / admin
exports.getAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("accountReference");

  const transaction_url = `https://api.ercaspay.com/api/v1/virtual-bank-account/${user.accountReference}`;
  const account = await axios(transaction_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ECRS_SECRET_KEY}`,
    },
  });

  res.status(200).json({
    success: true,
    data: account.data,
  });
});

// @desc    Verify subscription
// @route   POST /api/v1/payments/webhook
// @access  Private
exports.webhook = asyncHandler(async (req, res, next) => {
  //validate event
  res.sendStatus(200);
  var hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    var event = req.body;
    console.log(event);
    if (event.event === "charge.success") {
      var chargeEvent = await Event.find({
        transactionId: `${event.data.reference}`,
        type: "charge",
      });

      if (chargeEvent.length === 0) {
        // update customer if name doesn't exist
        var user = await User.findOne({ email: event.data.customer.email });
        if (!event.data.customer.first_name) {
          const nameFields = JSON.stringify({
            first_name: `${user.firstName}`,
            last_name: `${user.lastName}`,
          });
          const update_customer_url = `https://api.paystack.co/customer/${event.data.customer.customer_code}`;
          await axios(update_customer_url, {
            method: "PUT",
            data: nameFields,
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }

        if (event.data.metadata.reason === "Insurance Payment") {
          const insurance = await Insurance.findById(
            event.data.metadata.insurance_id
          );

          await Insurance.findByIdAndUpdate(
            insurance._id,
            { status: "success" },
            {
              new: true,
              runValidators: true,
            }
          );
        }

        if (event.data.metadata.reason === "Inspection Payment") {
          const inspection = await Inspection.findById(
            event.data.metadata.inspection_id
          );

          await Inspection.findByIdAndUpdate(
            inspection._id,
            { paid: true },
            {
              new: true,
              runValidators: true,
            }
          );
        }

        await Event.create({
          transactionId: `${event.data.reference}`,
          type: "charge",
        });
      }
    }

    if (event.event === "transfer.success") {
      var transferEvent = await Event.find({
        transactionId: `${event.data.reference}`,
        type: "transfer",
      });

      if (transferEvent.length === 0) {
        if (event.data.reason === "withdrawal") {
          const charitywit = await Insurance.findOne({
            email: event.data.recipient.email,
          });

          const charityFieldsToUpdate = {
            balance: charitywit.balance - event.data.amount,
          };

          await Insurance.findByIdAndUpdate(
            charitywit._id,
            charityFieldsToUpdate,
            {
              new: true,
              runValidators: true,
            }
          );
        }

        await Event.create({
          transactionId: `${event.data.reference}`,
          type: "transfer",
        });
      }
    }

    if (event.event === "transfer.reversed") {
      var transferEvent = await Event.find({
        transactionId: `${event.data.reference}`,
        type: "transfer",
      });

      if (transferEvent.length === 0) {
        if (event.data.reason === "withdrawal") {
          const charitywit = await Insurance.findOne({
            email: event.data.recipient.email,
          });

          const charityFieldsToUpdate = {
            balance: charitywit.balance + event.data.amount,
          };

          await Insurance.findByIdAndUpdate(
            charitywit._id,
            charityFieldsToUpdate,
            {
              new: true,
              runValidators: true,
            }
          );
        }

        await Event.create({
          transactionId: `${event.data.reference}`,
          type: "transfer",
        });
      }
    }
  }
});
