import { DataTypes, sequelize } from "../lib/index.js";
import { department } from "./department.model.js";
import { employee } from "./employee.model.js";

export const employeeDepartment = sequelize.define("employeeDepartment", {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "employee",
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: "department",
      key: "id",
    },
  },
});

employee.belongsToMany(department, { through: employeeDepartment });
department.belongsToMany(employee, { through: employeeDepartment });
