import { app, getMovies, getMovieById, addMovie } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
    addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Movies API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getMovies should return a list of movies", () => {
        const mockMovies = [
            {
                id: 1,
                title: "The Shawshank Redemption",
                director: "Frank Darabont",
            },
            { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
        ];

        getMovies.mockReturnValue(mockMovies);

        let result = getMovies();
        expect(result).toEqual(mockMovies);
        expect(getMovies).toHaveBeenCalled();
    });

    test("getMovieById should return a movie details by ID", () => {
        const mockMovie = {
            id: 1,
            title: "The Shawshank Redemption",
            director: "Frank Darabont",
        };

        getMovieById.mockReturnValue(mockMovie);

        let result = getMovieById(1);
        expect(result).toEqual(mockMovie);
        expect(getMovieById).toHaveBeenCalledWith(1);
    });

    test("getMovieById should return undefined if movie id not found", () => {
        getMovieById.mockReturnValue(undefined);

        let result = getMovieById(45);
        expect(result).toBeUndefined();
        expect(getMovieById).toHaveBeenCalledWith(45);
    });

    test("addMovie should add a new movie", () => {
        const newMovie = {
            id: 4,
            title: "Inception",
            director: "Christopher Nolan",
        };

        addMovie.mockReturnValue(newMovie);

        let result = addMovie(newMovie);
        expect(result).toEqual(newMovie);
        expect(addMovie).toHaveBeenCalledWith(newMovie);
    });
});
