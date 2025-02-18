import request from "supertest";
import { app, validateEmployee, validateCompany } from "../index.js";
import http from "http";

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("API Endpoints to add data", () => {
    // 3: Test Add a New Employee with Valid Input
    it("should add a new employee with valid input", async () => {
        const res = await request(server)
            .post("/api/employees")
            .send({ name: "Jone Doe", companyId: 1 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ id: 1, name: "Jone Doe", companyId: 1 });
    });

    // 4: Test Add a New Employee with Invalid Input.

    it("should return 400 from invalid employee input", async () => {
        const res = await request(server)
            .post("/api/employees")
            .send({ name: "Jone Doe" });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual(
            "Company Id is required and should be a number",
        );
    });

    // 5: Test Add a New Company with Valid Input

    it("should add a new company with valid input", async () => {
        const res = await request(server)
            .post("/api/companies")
            .send({ name: "TechCorp" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ id: 1, name: "TechCorp" });
    });

    // 6: Test Add a New Company with Invalid Input

    it("should return 400 from invalid company input", async () => {
        const res = await request(server)
            .post("/api/companies")
            .send({ name: 44 });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Name is required and should be a string");
    });
});

describe("Validation Functions", () => {
    // 7: Test Employee Validation Function with Jest Mocks

    it("should validate employee input correctly", () => {
        expect(validateEmployee({ name: "Jone Doe", companyId: 1 })).toBeNull();
    });

    // 8: Test Employee Validation Function Error Handling with Jest Mocks

    it("should return error message for invalid employee input", () => {
        expect(validateEmployee({ companyId: 1 })).toEqual(
            "Name is required and should be a string",
        );
        expect(validateEmployee({ name: "Jone Doe" })).toEqual(
            "Company Id is required and should be a number",
        );
    });

    // 9: Test Company Validation Function with Jest Mocks

    it("should validate company input correctly", () => {
        expect(validateCompany({ name: "TechCorp" })).toBeNull();
    });

    // 10: Test Company Validation Function Error Handling with Jest Mocks

    it("should return error message for invalid company input", () => {
        expect(validateCompany({ name: 44 })).toEqual(
            "Name is required and should be a string",
        );
    });
});
