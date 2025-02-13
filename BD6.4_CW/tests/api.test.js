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
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No books found");
  });

  // 7: Test get book by non-existent ID

  it("GET API /api/books/:id should return 404 for non-existing book", async () => {
    getBookById.mockReturnValue(null);

    const response = await request(server).get("/api/books/88");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No book found by ID");
  });

  //  8: Test get all reviews with no reviews

  it("GET API /api/reviews should return 404 if no reviews are found", async () => {
    getAllReviews.mockReturnValue([]);

    const response = await request(server).get("/api/reviews");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No reviews found");
  });

  // 9: Test get review by non-existent ID

  it("GET API /api/reviews/:id should return 404 for non-existing review", async () => {
    getReviewById.mockReturnValue(null);

    const response = await request(server).get("/api/reviews/88");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No review found by ID");
  });

  // 10: Test get user by non-existent ID

  it("GET API /api/users/:id should return 404 for non-existing user", async () => {
    getUserById.mockReturnValue(null);

    const response = await request(server).get("/api/users/88");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No user found by ID");
  });
});
