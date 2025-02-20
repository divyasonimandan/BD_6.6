import request from "supertest";
import { app, validateArticle, validateAuthor } from "../index.js";
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

    // 4: Test Add a New Article with Invalid Input.

    it("should return 400 for invalid article input", async () => {
        const res = await request(server)
            .post("/articles")
            .send({ title: "Mastering Node.js" });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Content is required and should be a string");
    });

    // 5: Test Add a New Author with Valid Input.

    it("should add a new author with valid input", async () => {
        const res = await request(server).post("/authors").send({
            name: "Alice Johnson",
            articleId: 3,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 3,
            name: "Alice Johnson",
            articleId: 3,
        });
    });

    // 6: Test Add a New Author with Invalid Input

    it("should return 400 for invalid author input", async () => {
        const res = await request(server)
            .post("/authors")
            .send({ name: "Alice Johnson" });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual(
            "Article Id is required and should be a number",
        );
    });
});

describe("Validation Functions", () => {
    // 7: Test Article Validation Function with Jest Mocks

    it("should validate article input correctly", () => {
        expect(
            validateArticle({
                title: "Mastering Node.js",
                content:
                    "Node.js is a powerful tool for backend development...",
            }),
        ).toBeNull();
    });

    // 8: Test Article Validation Function Error Handling with Jest Mocks.

    it("should return error message for invalid article input", () => {
        expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
            "Content is required and should be a string",
        );
        expect(
            validateArticle({
                content:
                    "Node.js is a powerful tool for backend development...",
            }),
        ).toEqual("Title is required and should be a string");
    });

    // 9: Test Author Validation Function with Jest Mocks.

    it("should validate author input correctly", () => {
        expect(
            validateAuthor({ name: "Alice Johnson", articleId: 3 }),
        ).toBeNull();
    });

    // 10: Test Author Validation Function Error Handling with Jest Mocks

    it("should return error message for invalid author input", () => {
        expect(validateAuthor({ name: "Alice Johnson" })).toEqual(
            "Article Id is required and should be a number",
        );
        expect(validateAuthor({ articleId: 3 })).toEqual(
            "Name is required and should be a string",
        );
    });
});
