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
  //Test 1: Get All Shows
  it("should retrieve all shows", async () => {
    const shows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ];

    getAllShows.mockResolvedValue(shows);
    let res = await request(server).get("/shows");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ shows });
  });

  // Test 2: Get Show by ID
  it("should retrieve a show by id", async () => {
    const show = {
      showId: 1,
      title: "The Lion King",
      theatreId: 1,
      time: "7:00 PM",
    };

    getShowById.mockResolvedValue(show);
    let res = await request(server).get("/shows/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ show });
  });

  // Test 3: Add a New Show
  it("should add a new show", async () => {
    const newShow = {
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    };

    addNewShow.mockResolvedValue(newShow);
    let res = await request(server).post("/shows").send({
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(newShow);
  });

  // Test 4: Error Handling for Get Show by Invalid ID
  it("should return 404 for invalid show id", async () => {
    getShowById.mockResolvedValue(null);
    let res = await request(server).get("/shows/11");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: "No show found by ID" });
  });

  // Test 5: Input Validation for Add Show
  it("should return 400 for invalid input", async () => {
    addNewShow.mockResolvedValue(null);
    let res = await request(server).post("/shows").send({
      theatreId: 2,
      time: "5:00 PM",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: "Invalid input" });
  });

  // Test 6: Mock getAllShows Function
  it("should return correctly call the function", async () => {
    getAllShows.mockResolvedValue([
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ]);
    let res = await request(server).get("/shows");
    expect(res.statusCode).toEqual(200);
  });

  // Test 7: Mock Add Show Function
  it("should add a new show", async () => {
    addNewShow.mockResolvedValue({
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });
    let res = await request(server)
      .post("/shows")
      .send({ title: "Phantom of the Opera", theatreId: 2, time: "5:00 PM" });
    expect(res.statusCode).toEqual(201);
  });
});
