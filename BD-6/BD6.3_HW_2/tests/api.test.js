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

    // 5: Test get employee by ID

    it("Should retrieve a specific employee by ID", async () => {
        const mockEmployee = {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            department: "Engineering",
        };

        getEmployeeById.mockResolvedValue(mockEmployee);
        let result = await request(server).get("/employees/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockEmployee);
    });

    // 6: Test get employee by non-existent ID.

    it("Should return 404 for non-existing employee", async () => {
        getEmployeeById.mockResolvedValue(null);
        let result = await request(server).get("/employees/details/11");
        expect(result.statusCode).toEqual(404);
    });

    // 7: Test add new employee.

    it("Should add new employee", async () => {
        const newEmployee = {
            id: 3,
            name: "Alice Brown",
            email: "alice.brown@example.com",
            department: "Sales",
        };

        addNewEmployee.mockResolvedValue(newEmployee);
        let result = await request(server)
            .post("/employees/new")
            .send({
                name: "Alice Brown",
                email: "alice.brown@example.com",
                department: "Sales",
            });

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(newEmployee);
    });
});
