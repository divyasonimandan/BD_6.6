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

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("APIs Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 6: Test get all reviews

  it("Should retrieve all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockReviews);
    const result = await request(server).get("/reviews");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviews);
  });

  // 7: Test get review by ID

  it("Should retrieve a specific review by ID", async () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };

    getReviewById.mockResolvedValue(mockReview);
    const result = await request(server).get("/reviews/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });

  // 8: Test get review by non-existent ID

  it("Should return 404 for non-existing review", async () => {
    getReviewById.mockResolvedValue(null);
    const res = await request(server).get("/reviews/details/999");

    expect(res.statusCode).toEqual(404);
  });

  // 9: Test add new review

  it("should add a new review", async () => {
    const mockReview = { id: 3, content: "Awesome!", userId: 1 };

    addNewReview.mockResolvedValue(mockReview);
    const res = await request(server)
      .post("/reviews/new")
      .send({ content: "Awesome!", userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockReview);
  });

  // 10: Test get user by ID

  it("Should retrieve a specific user by ID", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };

    getUserById.mockResolvedValue(mockUser);
    const res = await request(server).get("/users/details/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockUser);
  });

  // 
});
