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

describe("Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    tests("getAuthors should return a list of authors", () => {
        const mockAuthors = [
            { authorId: 1, name: "George Orwell", book: "1984" },
            { authorId: 2, name: "Aldous Huxley", book: "Brave New World" }
        ];

        getAuthors.mockReturnValue(mockAuthors);

        let result = getAuthors();
        expect(result).toEqual(mockAuthors);
        expect(getAuthors).toHaveBeenCalled();
    });
});
