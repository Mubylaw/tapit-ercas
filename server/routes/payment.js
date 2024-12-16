const express = require("express");
const { initializeTransaction, webhook } = require("../controllers/payments");

const router = express.Router({ mergeParams: true });

// Protect middleware
const {
  protect,
  authorize,
  validate,
  lastActive,
} = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(lastActive);

router.post("/", protect, initializeTransaction);
router.post("/webhook", webhook);

module.exports = router;
