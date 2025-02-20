import request from "supertest";
import { app } from "../index.js";
import { getAllEmployees, getEmployeeById } from "../controllers";
import http from "http";

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
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

  // 3: Test Retrieve All Employees

  it("Should retrieve all employees", async () => {
    const mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockResolvedValue(mockEmployees);
    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result).toEqual(mockEmployees);
  });

  // 4: Test Retrieve Employee by ID

  it("Should retrieve employee by ID", async () => {
    const mockEmployee = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };

    getEmployeeById.mockResolvedValue(mockEmployee);
    const result = await request(server).get("/employees/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual(mockEmployee);
  });

  //  5: Mock the Get All Employees Function

  it("should return correctly call the function", async () => {
    getAllEmployees.mockResolvedValue([
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ]);

    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
  });
});
