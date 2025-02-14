import request from "supertest";
import http from "http";
import { app } from "../index.js";
import {
    getAllGames,
    getGameById,
    getAllGenres,
    getGenreById,
} from "../game.js";
import { beforeEach } from "node:test";

jest.mock("../game.js", () => ({
    ...jest.requireActual("../game.js"),
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
    getAllGenres: jest.fn(),
    getGenreById: jest.fn(),
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

    // 5: Test get all games with no games.

    it("GET API /api/games should return 404 if no games found", async () => {
        getAllGames.mockReturnValue([]);

        let response = await request(server).get("/api/games");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No games found");
    });
});
