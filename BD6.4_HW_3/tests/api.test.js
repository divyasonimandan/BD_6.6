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
});
