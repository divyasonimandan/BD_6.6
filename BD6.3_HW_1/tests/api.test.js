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

  // 8: Test get game by non-existent ID.

  it("should return 404 for non-existing game", async () => {
    getGameById.mockResolvedValue(null);
    let result = await request(server).get("/games/details/99");
    expect(result.statusCode).toEqual(404);
  });

  // 9: Test add new game.

  it("Should add a new game", async () => {
    const newGame = { id: 3, name: "Epic Games", country: "USA" };

    addNewGame.mockResolvedValue(newGame);
    const res = await request(server)
      .post("/games/new")
      .send({ name: "Epic Games", country: "USA" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(newGame);
  });

  // 10: Test get developer by ID.

  it("Should retrieve a specific developer by id", async () => {
    const mockDeveloper = { id: 1, name: "Nintendo", country: "Japan" };

    getDeveloperById.mockResolvedValue(mockDeveloper);
    const result = await request(server).get("/developers/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloper);
  });

  // 11: Test get developer by non-existent ID.

  it("Should return 404 for non-existing developer", async () => {
    getDeveloperById.mockResolvedValue(null);
    let result = await request(server).get("/developers/details/90");

    expect(result.statusCode).toEqual(404);
  });

  // 12: Test add new developer.

  it("Should add a new developer", async () => {
    let newDeveloper = { id: 3, name: "Epic Games", country: "USA" };

    addNewDeveloper.mockResolvedValue(newDeveloper);
    let result = await request(server)
      .post("/developers/new")
      .send({ name: "Epic Games", country: "USA" });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newDeveloper);
  });
});
