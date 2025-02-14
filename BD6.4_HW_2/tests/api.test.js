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

    // 6: Test get game by non-existent ID.

    it("GET API /api/games/:id should return 404 for non-existing game ID", async () => {
        getGameById.mockReturnValue(null);

        let response = await request(server).get("/api/games/33");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No game found by Id");
    });

    // 7: Test get all genres with no genres.

    it("GET API /api/genres should return 404 if no genres found", async () => {
        getAllGenres.mockReturnValue([]);

        let response = await request(server).get("/api/genres");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No genres found");
    });

    // 8: Test get genre by non-existent ID.

    it("GET API /api/genres/:id should return 404 for non-existing genre ID", async () => {
        getGenreById.mockReturnValue(null);

        let response = await request(server).get("/api/genres/33");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No genre found by Id");
    });
});
