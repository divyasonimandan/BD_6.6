import request from "supertest";
import { app, validateUser, validateBook, validateReview } from "../index.js";
import http from "http";
import { it } from "node:test";

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  // 4: Test add a new user with valid input

  it("should add a new user with valid input", async () => {
    const res = await request(server).post("/api/users").send({
      name: "Alice",
      email: "alice@example.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  });

  // 5: Test add a new user with invalid input

  it("should return 400 from invalid user input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Alice" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be a string");
  });

  //6: Test add a new book with valid input

  it("should add a new book with valid input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "Moby Dick",
      author: "Herman Melville",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "Moby Dick",
      author: "Herman Melville",
    });
  });

  // 7: Test add a new book with invalid input

  it("should return 400 from invalid book input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "Moby Dick",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Author is required and should be a string");
  });

  // 8: Test add a new review with valid input.

  it("should add a new review with valid input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "Great book!",
      userId: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great book!",
      userId: 1,
    });
  });

  // 9: Test add a new review with invalid input

  it("should return 400 from invalid review input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "Great book!",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("User ID is required and should be a number");
  });
});
