const fs = require("fs").promises;
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

const DATA_FILE = path.join(__dirname, "..", process.env.DB_FILE_PATH);

class Transaction {
  // parse json file
  static async readData() {
    try {
      const data = await fs.readFile(DATA_FILE, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // default values
      if (error.code === "ENOENT") {
        return { balance: 0, transactions: [] };
      }
      throw error;
    }
  }

  static async writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }

  static async getBalance() {
    const data = await this.readData();
    return data.balance;
  }

  // fetches set limit of entries with default
  static async getLastTransactions(limit = 5) {
    const data = await this.readData();
    return data.transactions.slice(-limit);
  }

  static async addTransaction(transaction) {
    const data = await this.readData();
    // negate value if debit is selected, otherwise proceed with credit amount
    const transactionAmount =
      transaction.type === "debit" ? -transaction.amount : transaction.amount;
    // throw error if debit exceeds total balance
    if (data.balance + transactionAmount < 0) {
      throw new Error("Insufficient funds");
    }
    data.balance += transactionAmount;
    data.transactions.push(transaction);
    await this.writeData(data);
    return transaction;
  }
}

module.exports = Transaction;
