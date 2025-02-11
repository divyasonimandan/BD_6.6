import express from "express";
import { sequelize } from "./lib/index.js";
import { employee } from "./models/employee.model.js";
import { department } from "./models/department.model.js";
import { role } from "./models/role.model.js";
import { employeeDepartment } from "./models/employeeDepartment.model.js";
import { employeeRole } from "./models/employeeRole.model.js";

const app = express();
app.use(express.json());

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData = [];
  for (let i = 0; i < employeeDepartments.length; i++) {
    departmentData = await department.findOne({
      where: { id: employeeDepartments[i].departmentId },
    });
  }
  return departmentData;
}

// Helper function to get employee's associated roles.
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData = [];
  for (let i = 0; i < employeeRoles.length; i++) {
    roleData = await role.findOne({
      where: { id: employeeRoles[i].roleId },
    });
  }
  return roleData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}

// 1: Get All Employees.

async function getAllEmployees() {
  const employees = await employee.findAll();
  let employeeDetails = [];
  for (let i = 0; i < employees.length; i++) {
    let employeeData = await getEmployeeDetails(employees[i]);
    employeeDetails.push(employeeData);
  }
  return { employees: employeeDetails };
}

app.get("/employees", async (req, res) => {
  try {
    let response = await getAllEmployees();
    if (response.employeesDetails.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Get Employee by ID.

async function getEmployeeById(id) {
  const employeeData = await employee.findOne({ where: { id } });
  if (!employeeData) {
    return {};
  }
  let employeeDetails = await getEmployeeDetails(employeeData);
  return { employee: employeeDetails };
}

app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getEmployeeById(id);
    if (!response.employee) {
      return res
        .status(404)
        .json({ message: "Employee not found by ID " + id });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3: Get Employees by Department.

async function getEmployeeByDepartmentId(departmentId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { departmentId },
  });
  console.log(employeeDepartments);
  const employees = [];
  for (let i = 0; i < employeeDepartments.length; i++) {
    const employeeData = await employee.findOne({
      where: { id: employeeDepartments[i].employeeId },
    });
    employees.push(employeeData);
  }
  let employeeDetails = await getEmployeeDetails(employees);
  return { employees: employeeDetails };
}

app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    let departmentId = parseInt(req.params.departmentId);
    let response = await getEmployeeByDepartmentId(departmentId);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "Employee not found by ID " });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// async function getTicketDetails(ticketData) {
//   const customerData = await customer.findOne({
//     where: { id: ticketData.customerId },
//     attributes: ["id", "name", "email", "createdAt", "updatedAt"],
//   });
//   const agentData = await agent.findOne({
//     where: { id: ticketData.agentId },
//     attributes: ["id", "name", "email", "createdAt", "updatedAt"],
//   });
//   return {
//     id: ticketData.id,
//     title: ticketData.title,
//     description: ticketData.description,
//     status: ticketData.status,
//     priority: ticketData.priority,
//     createdAt: ticketData.createdAt,
//     updatedAt: ticketData.updatedAt,
//     customer: customerData,
//     agent: agentData,
//   };
// }

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
