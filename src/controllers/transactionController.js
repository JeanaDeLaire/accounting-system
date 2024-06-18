const Transaction = require("../models/transactionModel");
const { v4: uuidv4 } = require("uuid");

const getBalance = async (req, res) => {
  try {
    const balance = await Transaction.getBalance();
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getLastTransactions();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTransaction = async (req, res) => {
  const id = uuidv4();
  try {
    const { date, amount, type, description } = req.body;
    const newTransaction = { date, amount, type, description, id };
    await Transaction.addTransaction(newTransaction);
    res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    if (error.message === "Insufficient funds") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  getBalance,
  getLastTransactions,
  addTransaction,
};
