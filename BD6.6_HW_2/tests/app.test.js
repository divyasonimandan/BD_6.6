import request from "supertest";
import { app } from "../index.js";
import { getAllGames, getGameById } from "../controllers";
import http from "http";

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Controllers Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 3: Test Retrieve All Games.

    it("should retrieve all games", async () => {
        const mockGames = [
            {
                gameId: 1,
                title: "The Legend of Zelda: Breath of the Wild",
                genre: "Adventure",
                platform: "Nintendo Switch",
            },
            {
                gameId: 2,
                title: "Red Dead Redemption 2",
                genre: "Action",
                platform: "PlayStation 4",
            },
            {
                gameId: 3,
                title: "The Witcher 3: Wild Hunt",
                genre: "RPG",
                platform: "PC",
            },
        ];

        getAllGames.mockReturnValue(mockGames);
        let res = await request(server).get("/games");
        expect(res.status).toEqual(200);
        expect(res.body.games).toEqual(mockGames);
    });
});
