import request from "supertest";
import { app, validateUser, validateBook, validateReview } from "../index.js";
import http from "http";

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
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

  it("should return 400 from invalid user input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Alice" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be a string");
  });
});
