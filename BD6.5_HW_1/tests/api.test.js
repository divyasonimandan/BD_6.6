import request from "supertest";
import { app, validateGame, validateTournament } from "../index.js";
import http from "http";

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoints to add data", () => {
    // 3: Test Add a New Game with Valid Input

    it("should add a new user with valid input", async () => {
        const res = await request(server).post("/api/games").send({
            title: "The Legend of Zelda",
            genre: "Adventure",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual({
            id: 1,
            title: "The Legend of Zelda",
            genre: "Adventure",
        });
    });
});
