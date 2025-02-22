import request from "supertest";
import { app, getAllShows, getShowById, addNewShow } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllShows: jest.fn(),
  getShowById: jest.fn(),
  addNewShow: jest.fn(),
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

  it("should retrieve all shows", async () => {
    const mockShows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
    ];

    getAllShows.mockResolvedValue(mockShows);
    let res = await request(server).get("/shows");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockShows);
  });
});
