import request from "supertest";
import { app, validateArticle, validateAuthor } from "../index.js";
import http from "http";

let server;

beforeAll((done) => () => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => () => {
    server.close(done);
});

describe("API Endpoints to add data", () => {
    // 3: Test Add a New Article with Valid Input

    it("should add a new article with valid input", async () => {
        const res = await request(server).post("/articles").send({
            title: "Mastering Node.js",
            content: "Node.js is a powerful tool for backend development...",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 3,
            title: "Mastering Node.js",
            content: "Node.js is a powerful tool for backend development...",
        });
    });
});
