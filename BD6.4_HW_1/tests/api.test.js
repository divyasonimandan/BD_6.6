import request from "supertest";
import {
    getAllEmployees,
    getEmployeeById,
    getAllDepartments,
    getDepartmentById,
} from "../employee.js";
import { app } from "../index.js";
import http from "http";

jest.mock("../employee.js", () => ({
    ...jest.requireActual("../employee.js"),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    getAllDepartments: jest.fn(),
    getDepartmentById: jest.fn(),
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

    // 5: Test get all employees with no employees

    it("GET API /api/employees should return 404 if no employees found", async () => {
        getAllEmployees.mockReturnValue([]);

        let response = await request(server).get("/api/employees");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No employees found");
    });
});
