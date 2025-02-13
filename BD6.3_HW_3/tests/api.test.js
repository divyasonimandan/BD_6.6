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

describe("APIs Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // 4 : Test Get All Recipes

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

    //  5 : Test Get Recipe by ID.

    it("Should retrieve a specific recipe by id", async () => {
        const mockRecipe = {
            id: 1,
            name: "Spaghetti Bolognese",
            cuisine: "Italian",
            difficulty: "Medium",
        };

        getRecipeById.mockResolvedValue(mockRecipe);
        let result = await request(server).get("/recipes/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockRecipe);
    });

    // 6 : Test Get Recipe by Non-Existent ID.

    it("Should return 404 for non-existing recipe", async () => {
        getRecipeById.mockResolvedValue(null);
        let result = await request(server).get("/recipes/details/50");
        expect(result.statusCode).toEqual(404);
    });

    // 7 : Test Add New Recipe.

    it("Should add new recipe", async () => {
        const newRecipe = {
            id: 3,
            name: "Sushi",
            cuisine: "Japanese",
            difficulty: "Hard",
        };
        addNewRecipe.mockResolvedValue(newRecipe);
        let result = await request(server)
            .post("/recipes/new")
            .send({ name: "Sushi", cuisine: "Japanese", difficulty: "Hard" });
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(newRecipe);
    });
});
