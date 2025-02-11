import { DataTypes, sequelize } from "../lib/index.js";
import { role } from "./role.model.js";
import { employee } from "./employee.model.js";

export const employeeRole = sequelize.define("employeeRole", {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "employee",
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: "role",
      key: "id",
    },
  },
});

employee.belongsToMany(role, { through: employeeRole });
role.belongsToMany(employee, { through: employeeRole });
