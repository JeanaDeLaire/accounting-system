const supertest = require("supertest");
const { server } = require("../../../server");

// Mock transactionModel to avoid posting test data to json storage
jest.mock("../../../src/models/transactionModel", () => ({
  getBalance: jest.fn(),
  getLastTransactions: jest.fn(),
  addTransaction: jest.fn(),
}));

describe("Transaction Controller", () => {
  let request;

  beforeAll(() => {
    // setup supertest server
    request = supertest(server);
  });

  afterAll((done) => {
    // teardown server instance
    server.close(done);
  });

  describe("GET /api/balance", () => {
    it("should get the balance", async () => {
      const mockBalance = 1000;
      require("../../../src/models/transactionModel").getBalance.mockResolvedValue(
        mockBalance
      );
      const response = await request.get("/api/balance");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ balance: mockBalance });
    });
  });

  describe("GET /api/transactions", () => {
    it("should get the last 5 transactions", async () => {
      const mockTransactions = [
        {
          id: "1",
          date: "2024-06-25T12:00:00Z",
          amount: 100.0,
          type: "credit",
          description: "Test transaction 1",
        },
        {
          id: "2",
          date: "2024-07-25T12:00:00Z",
          amount: 100.0,
          type: "credit",
          description: "Test transaction 2",
        },
        {
          id: "3",
          date: "2024-08-25T12:00:00Z",
          amount: 55.55,
          type: "debit",
          description: "Test transaction 3",
        },
        {
          id: "4",
          date: "2024-09-25T12:00:00Z",
          amount: 300.0,
          type: "credit",
          description: "Test transaction 4",
        },
        {
          id: "5",
          date: "2024-10-25T12:00:00Z",
          amount: 100.0,
          type: "debit",
          description: "Test transaction 5",
        },
      ];
      require("../../../src/models/transactionModel").getLastTransactions.mockResolvedValue(
        mockTransactions
      );
      const response = await request.get("/api/transactions");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ transactions: mockTransactions });
    });
  });

  describe("POST /api/transaction", () => {
    it("should add a new transaction", async () => {
      const mockCreditTransaction = {
        date: "2024-06-25T12:00:00Z",
        amount: 100.0,
        type: "credit",
        description: "Test transaction",
      };
      require("../../../src/models/transactionModel").addTransaction.mockResolvedValue();
      const response = await request
        .post("/api/transaction")
        .send(mockCreditTransaction);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Transaction successful");
    });

    it("should handle insufficient funds error", async () => {
      const mockDebitTransaction = {
        date: "2024-06-25T12:00:00Z",
        amount: 100000.0,
        type: "debit",
        description: "Test transaction",
      };
      require("../../../src/models/transactionModel").addTransaction.mockRejectedValue(
        new Error("Insufficient funds")
      );
      const response = await request
        .post("/api/transaction")
        .send(mockDebitTransaction);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Insufficient funds");
    });

    it("should handle other errors", async () => {
      // Mock internal server error
      require("../../../src/models/transactionModel").addTransaction.mockRejectedValue(
        new Error("Internal Server Error")
      );
      const mockTransaction = {
        date: "2024-06-25T12:00:00Z",
        amount: 100.0,
        type: "credit",
        description: "Test transaction",
      };
      const response = await request
        .post("/api/transaction")
        .send(mockTransaction);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Internal Server Error");
    });
  });
});
