import cors from "cors";
import express from "express";
import { getAllEmployees, getEmployeeById } from "../controllers";

const app = express();
app.use(cors());
app.use(express.json());

// 1: Retrieve All Employees

app.get("/employees", async (req, res) => {
  let employees = await getAllEmployees();
  res.json({ employees });
});

// 2: Retrieve Employee by ID

app.get("/employees/details/:id", async (req, res) => {
  let employee = await getEmployeeById(parseInt(req.params.id));
  res.json({ employee });
});

export { app };
