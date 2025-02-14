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

    // 6: Test get employee by non-existent ID

    it("GET API /api/employees/:id should return 404 for non-existing employee", async () => {
        getEmployeeById.mockReturnValue(null);

        let response = await request(server).get("/api/employees/44");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No employee found by Id");
    });

    // 7: Test get all departments with no departments

    it("GET API /api/departments should return 404 if departments found", async () => {
        getAllDepartments.mockReturnValue([]);

        let response = await request(server).get("/api/departments");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No departments found");
    });

    // 8: Test get department by non-existent ID

    it("GET API /api/departments/:id should return 404 for non-existing department", async () => {
        getDepartmentById.mockReturnValue(null);

        let response = await request(server).get("/api/departments/81");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No department found by Id");
    });
});
