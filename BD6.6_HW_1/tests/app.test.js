import request from "supertest";
import { app } from "../index.js";
import { getAllEmployees, getEmployeeById } from "../controllers";
import http from "http";

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controllers Function Tests", () => {
  
})
