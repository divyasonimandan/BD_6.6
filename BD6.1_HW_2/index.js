import express from "express";
import { getEmployees, getEmployeeById, addEmployee } from "./employee.js";
const app = express();
const PORT = 3000;

app.use(express.json());

// 1: Get all employees.

app.get("/employees", (req, res) => {
    res.json(getEmployees());
});

// 2: Get employee by ID.

app.get("/employees/:id", (req, res) => {
    const employee = getEmployeeById(parseInt(req.params.id));
    if (!employee)
        return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
});

// 3: Push new employee.

app.post("/employees", (req, res) => {
    const employee = addEmployee(req.body);
    res.status(201).json(employee);
});

app.listen(PORT, () => {
    console.log("server is running on port 3000");
});

export default app;
