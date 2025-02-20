
import request from "supertest";
import { getAllBooks, getBookById } from "../controllers";
import { app } from "../index.js";
import http from "http";

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Controllers Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 3: Test Retrieve All Books.

    it("should retrieve all books", async () => {
        const mockBooks = [
            {
                bookId: 1,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
            },
            {
                bookId: 2,
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
            },
            {
                bookId: 3,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
            },
        ];

        getAllBooks.mockReturnValue(mockBooks);
        const res = await request(server).get("/books");
        expect(res.status).toEqual(200);
        expect(res.body.books).toEqual(mockBooks);
    });
});
