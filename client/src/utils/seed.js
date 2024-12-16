export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const banks = [
  "Access Bank Plc",
  "Citibank Nigeria Limited",
  "Ecobank Nigeria Plc",
  "Fidelity Bank Plc",
  "First Bank Nigeria Limited",
  "First City Monument Bank Plc",
  "Globus Bank Limited",
  "Guaranty Trust Bank Plc",
  "Heritage Banking Company Ltd.",
  "Keystone Bank Limited",
  "Nova Commercial Bank Limited",
  "Optimus Bank",
  "Parallex Bank Ltd",
  "Polaris Bank Plc",
  "Premium Trust Bank",
  "Providus Bank",
  "Signature Bank Limited",
  "Stanbic IBTC Bank Plc",
  "Standard Chartered Bank Nigeria Ltd.",
  "Sterling Bank Plc",
  "SunTrust Bank Nigeria Limited",
  "Titan Trust Bank Ltd",
  "Union Bank of Nigeria Plc",
  "United Bank For Africa Plc",
  "Unity Bank Plc",
  "Wema Bank Plc",
  "Zenith Bank Plc",
];

export const splitAmount = (amount) => {
  const numericAmount = parseInt(amount, 10);

  if (numericAmount > 1) {
    const randomSplit = Math.floor(Math.random() * (numericAmount - 1)) + 1;

    return [randomSplit, numericAmount - randomSplit];
  } else {
    alert("Please enter an amount greater than 1 to split.");
  }
};
