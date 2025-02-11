import request from "supertest";
import {
  app,
  getAllReviews,
  getReviewById,
  addNewReview,
  getUserById,
  addNewUser,
} from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addNewReview: jest.fn(),
  getUserById: jest.fn(),
  addNewUser: jest.fn(),
}));

let server;

beforeAll((done) => () => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  Server.close(done);
});

describe("APIs Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockReviews);
    const result = await request(server).get("/reviews");
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockReviews);
  });
});
