import { getEmployees, getEmployeeById, addEmployee  } from "./../employee.js";

describe("Employees Function", () => {
    it("Should get all employees", () => {
        let employees = getEmployees();

        expect(employees.length).toBe(4);
        expect(employees).toEqual([
            { id: 1, name: 'John Doe', position: 'Software Engineer' },
            { id: 2, name: 'Jane Smith', position: 'Product Manager' },
            { id: 3, name: 'Sam Johnson', position: 'Designer' },
            { id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' }
          ]);
    });
    it("Should return an employee by ID", () => {
        let employee = getEmployeeById(3);

        expect(employee).toEqual({ id: 3, name: 'Sam Johnson', position: 'Designer' })
    });

    it("Should return a undefined for a non-existant employee", () => {
        let employee = getEmployeeById(9);

        expect(employee).toBeUndefined();
    });

    it("Should add an employee", () => {
        let newEmployee = {
            name: 'John Doe',
            position: 'Software Engineer'
        }
        let addedEmployee = addEmployee(newEmployee);
        expect(addedEmployee).toEqual({
            id: 5,
            name: 'John Doe',
            position: 'Software Engineer'
          });

        const employees = getEmployees();
        expect(employees.length).toBe(5);  
    });
})
