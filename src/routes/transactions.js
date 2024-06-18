const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

// Endpoint to fetch current account balance
router.get("/balance", transactionController.getBalance);

// Endpoint to fetch last 5 transactions
router.get("/transactions", transactionController.getLastTransactions);

// Endpoint to post a transaction
router.post("/transaction", transactionController.addTransaction);

module.exports = router;
