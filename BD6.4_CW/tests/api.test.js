import request from "supertest";
import http from "http";
import {
  getAllBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} from "../book.js";
import { app } from "../index.js";
import { it } from "node:test";

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  getUserById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("APIs Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 6: Test get all books with no books.

  it("GET API /api/books should return 404 if no books are found", async () => {
    getAllBooks.mockReturnValue([]);
    const response = await request(server).get("/api/books");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "No books found" });
  });
});
