import express from "express";
const app = express();
import {
  getAllEmployees,
  getEmployeeById,
  getAllDepartments,
  getDepartmentById,
} from "./employee.js";
app.use(express.json());

// 1: Get All Employees

app.get("/api/employees", async (req, res) => {
  try {
    let employees = await getAllEmployees();
    if (employees.length === 0)
      return res.status(404).json({ error: "No employees found" });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2: Get Employee by ID

app.get("/api/employees/:id", async (req, res) => {
  try {
    let employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee)
      return res.status(404).json({ error: "No employee found by Id" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3: Get All Departments.

app.get("/api/departments", async (req, res) => {
  try {
    let departments = await getAllDepartments();
    if (departments.length === 0)
      return res.status(404).json({ error: "No departments found" });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4: Get Department by ID

app.get("/api/departments/:id", async (req, res) => {
  try {
    let department = await getDepartmentById(parseInt(req.params.id));
    if (!department)
      return res.status(404).json({ error: "No deaprtment found by Id" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { app };
