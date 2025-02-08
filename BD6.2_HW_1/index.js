import express from "express";
const app = express();

app.use(express.json());

let employees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getEmployees() {
    return employees;
}

function getEmployeeById(id) {
    return employees.find((employee) => employee.id === id);
}

function addEmployee(employee) {
    let newEmployee = employees.push(employee);
    return newEmployee;
}

// 1: Get all employees.

app.get("/employees", (req, res) => {
    res.json(getEmployees());
});

// 2: Get employee by ID.

app.get("/employees/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let employee = getEmployeeById(id);
    if (!employee)
        return res
            .status(404)
            .json({ message: "Employee not found by ID " + id });
    res.json(employee);
});

// 3: Add new employee.

app.post("/employees/new", (req, res) => {
    let employee = addEmployee(req.body);
    res.status(201).json(employee);
});

export { app, getEmployees, getEmployeeById, addEmployee };
