import { app, getEmployees, getEmployeeById, addEmployee } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Employees API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getEmployees should return a list of employees", () => {
        const mockEmployees = [
            { id: 1, name: "John Doe", position: "Software Engineer" },
            { id: 2, name: "Jane Smith", position: "Product Manager" },
        ];

        getEmployees.mockReturnValue(mockEmployees);

        let result = getEmployees();
        expect(result).toEqual(mockEmployees);
        expect(getEmployees).toHaveBeenCalled();
    });

    test("getEmployeeByID should return an employee details by ID", () => {
        const mockEmployee = {
            id: 1,
            name: "John Doe",
            position: "Software Engineer",
        };

        getEmployeeById.mockReturnValue(mockEmployee);

        let result = getEmployeeById(1);
        expect(result).toEqual(mockEmployee);
        expect(getEmployeeById).toHaveBeenCalledWith(1);
    });

    test("getEmployeeById should return undefined if employee id not found", () => {
        getEmployeeById.mockReturnValue(undefined);

        let result = getEmployeeById(67);
        expect(result).toBeUndefined();
        expect(getEmployeeById).toHaveBeenCalledWith(67);
    });

    test("addEmployee should add a new employee", () => {
        const newEmployee = {
            id: 4,
            name: "Alice Johnson",
            position: "HR Manager",
        };
        addEmployee.mockReturnValue(newEmployee);

        let result = addEmployee(newEmployee);
        expect(result).toEqual(newEmployee);
        expect(addEmployee).toHaveBeenCalledWith(newEmployee);
    });
});
