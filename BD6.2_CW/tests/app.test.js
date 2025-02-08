import test from "node:test";
import { app, getAuthors, getAuthorById, addAuthor } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAuthors: jest.fn(),
    getAuthorById: jest.fn(),
    addAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Author API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAuthors should return a list of authors", () => {
        const mockAuthors = [
            { authorId: 1, name: "George Orwell", book: "1984" },
            { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
        ];
        getAuthors.mockReturnValue(mockAuthors);

        let result = getAuthors();
        expect(result).toEqual(mockAuthors);
        expect(getAuthors).toHaveBeenCalled();
    });

    test("getAuthorById should return an author details", () => {
        const mockAuthor = { authorId: 1, name: "George Orwell", book: "1984" };

        getAuthorById.mockReturnValue(mockAuthor);
        let result = getAuthorById(1);
        expect(result).toEqual(mockAuthor);
        expect(getAuthorById).toHaveBeenCalledWith(1);
    });

    test("getAuthorById should return undefined if author id not found", () => {
        getAuthorById.mockReturnValue(undefined);

        let result = getAuthorById(55);
        expect(result).toBeUndefined();
        expect(getAuthorById).toHaveBeenCalledWith(55);
    });
});
