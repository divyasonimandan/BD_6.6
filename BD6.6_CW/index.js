import cors from "cors";
import express from "express";
import { getAllEmployees, getEmployeeById } from "./controllers/index.js";

const app = express();
app.use(cors());
app.use(express.json());

// 1: Retrieve All Employees

app.get("/employees", (req, res) => {
  let employees = getAllEmployees();
  console.log(employees);

  res.json(employees);
});

// 2: Retrieve Employee by ID

app.get("/employees/details/:id", (req, res) => {
  let employee = getEmployeeById(parseInt(req.params.id));
  console.log(employee);
  res.json(employee);
});

export { app };
