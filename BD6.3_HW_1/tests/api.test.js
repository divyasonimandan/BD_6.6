import request from "supertest";
import {
  app,
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
} from "../index.js";
import http from "http";
import { it } from "node:test";

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addNewGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addNewDeveloper: jest.fn(),
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

  // 6: Test get all games.

  it("Should retrieve all games", async () => {
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];

    getAllGames.mockResolvedValue(mockGames);
    let result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  // 7: Test get game by ID.

  it("Should retrieve a specific game by ID", async () => {
    const mockGame = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };

    getGameById.mockResolvedValue(mockGame);
    let result = await request(server).get("/games/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGame);
  });
});
