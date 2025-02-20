import request from "supertest";
import http from "http";
import { app } from "../index.js";
import {
    getAllArticles,
    getArticleById,
    getAllComments,
    getCommentById,
    getUserById,
} from "../article.js";

jest.mock("../article.js", () => ({
    ...jest.requireActual("../article.js"),
    getAllArticles: jest.fn(),
    getArticleById: jest.fn(),
    getAllComments: jest.fn(),
    getCommentById: jest.fn(),
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

    //  6: Test Get All Articles with No Articles

    it("GET API /articles should return 404 if no articles found", async () => {
        getAllArticles.mockReturnValue([]);

        let response = await request(server).get("/articles");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No articles found");
    });

    //  7: Test Get Article by Non-existent ID.

    it("GET API /articles/:id should return 404 for non-existing article ID", async () => {
        getArticleById.mockReturnValue(null);

        let response = await request(server).get("/articles/13");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No article found by Id");
    });

    // 8: Test Get All Comments with No Comments

    it("GET API /comments should return 404 if no comments found", async () => {
        getAllComments.mockReturnValue([]);

        let response = await request(server).get("/comments");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No comments found");
    });

    // 9: Test Get Comment by Non-Existent ID

    it("GET API /comments/:id should return 404 for non-existing comment ID", async () => {
        getCommentById.mockReturnValue(null);

        let response = await request(server).get("/comments/11");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No comment found by Id");
    });

    // 10: Test Get User by Non-Existent ID

    it("GET API /users/:id should return 404 for non-existing user ID", async () => {
        getUserById.mockReturnValue(null);

        let response = await request(server).get("/users/50");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No user found by Id");
    });
});
