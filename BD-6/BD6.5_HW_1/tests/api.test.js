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

    it("should add a new game with valid input", async () => {
        const res = await request(server).post("/api/games").send({
            title: "The Legend of Zelda",
            genre: "Adventure",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            title: "The Legend of Zelda",
            genre: "Adventure",
        });
    });

    // 4: Test Add a New Game with Invalid Input.

    it("should return 400 from invalid game input", async () => {
        const res = await request(server).post("/api/games").send({
            title: "The Legend of Zelda",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Genre is required and should be a string");
    });

    // 5: Test Add a New Tournament with Valid Input.

    it("should add a new tournament with valid input", async () => {
        const res = await request(server).post("/api/tournaments").send({
            name: "Zelda Championship",
            gameId: 1,
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            name: "Zelda Championship",
            gameId: 1,
        });
    });

    // 6: Test Add a New Tournament with Invalid Input

    it("should return 400 from invalid tournament input", async () => {
        const res = await request(server)
            .post("/api/tournaments")
            .send({ name: "Zelda Championship" });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Game Id is required and should be a number");
    });
});

describe("Validation Functions", () => {
    // 7: Test Game Validation Function.

    it("should validate game input correctly", () => {
        expect(
            validateGame({ title: "The Legend of Zelda", genre: "Adventure" }),
        ).toBeNull();
    });

    // 8: Test Game Validation Function Error Handling with Jest Mocks

    it("should return error message for invalid game input", () => {
        expect(validateGame({ title: "The Legend of Zelda" })).toEqual(
            "Genre is required and should be a string",
        );
        expect(validateGame({ genre: "Adventure" })).toEqual(
            "Title is required and should be a string",
        );
    });

    // 9: Test Tournament Validation Function

    it("should validate tournament input correctly", () => {
        expect(
            validateTournament({ name: "Zelda Championship", gameId: 1 }),
        ).toBeNull();
    });

    // 10: Test Tournament Validation Function Error Handling

    it("should return error message for invalid tournament input", () => {
        expect(validateTournament({ name: "Zelda Championship" })).toEqual(
            "Game Id is required and should be a number",
        );
        expect(validateTournament({ gameId: 1 })).toEqual(
            "Name is required and should be a string",
        );
    });
});
