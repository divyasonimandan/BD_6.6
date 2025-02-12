import request from "supertest";
import {
    app,
    getAllEmployees,
    getEmployeeById,
    addNewEmployee,
} from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    addNewEmployee: jest.fn(),
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

    // 4: Test get all employees.

    it("Should retrieve all employees", async () => {
        const mockEmployees = [
            {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                department: "Engineering",
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                department: "Marketing",
            },
        ];

        getAllEmployees.mockResolvedValue(mockEmployees);
        let result = await request(server).get("/employees");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockEmployees);
    });
});
