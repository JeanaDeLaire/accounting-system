require("dotenv").config();

const express = require("express");
const cors = require("cors");
const transactionRoute = require("./src/routes/transactions");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", transactionRoute);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = {
  app, 
  server, 
};
