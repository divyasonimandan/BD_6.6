import request from "supertest";
import { app } from "../index.js";
import { getAllEmployees, getEmployeeById } from "../controllers";
import http from "http";

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controllers Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // 3: Test Retrieve All Movies
  it("should retrieve all movies", async () => {
    let mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);
    let res = await request(server).get("/movies");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(mockMovies);
  });
});
