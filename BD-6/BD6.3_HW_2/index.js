import express from "express";
const app = express();

app.use(express.json());

let employees = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
    },
];

// functions...

async function getAllEmployees() {
    return employees;
}

async function getEmployeeById(id) {
    return employees.find((employee) => employee.id === id);
}

async function addNewEmployee(employee) {
    employee.id = employees.length + 1;
    employees.push(employee);
    return employee;
}

// 1: Get All Employees

app.get("/employees", async (req, res) => {
    let employees = await getAllEmployees();
    res.json(employees);
});

// 2: Get Employee by ID

app.get("/employees/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let employee = await getEmployeeById(id);
    if (!employee)
        return res
            .status(404)
            .json({ message: "No employee found by ID " + id });
    res.json(employee);
});

// 3: Add a New Employee.

app.post("/employees/new", async (req, res) => {
    let newEmployee = await addNewEmployee(req.body);
    res.status(201).json(newEmployee);
});

export { app, getAllEmployees, getEmployeeById, addNewEmployee };
