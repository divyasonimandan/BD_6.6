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
});
