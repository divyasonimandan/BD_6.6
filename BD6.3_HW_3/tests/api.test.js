import request from "supertest";
import { app, getAllRecipes, getRecipeById, addNewRecipe } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAllRecipes: jest.fn(),
    getRecipeById: jest.fn(),
    addNewRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("APIs Endpoints", async () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should retrieve all recipes", async () => {
        const mockRecipes = [
            {
                id: 1,
                name: "Spaghetti Bolognese",
                cuisine: "Italian",
                difficulty: "Medium",
            },
            {
                id: 2,
                name: "Chicken Tikka Masala",
                cuisine: "Indian",
                difficulty: "Hard",
            },
        ];

        getAllRecipes.mockResolvedValue(mockRecipes);
        let result = await request(server).get("/recipes");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockRecipes);
    });
});
