import { DataTypes, sequelize } from "../lib/index.js";

export const employee = sequelize.define("employee", {
  name: DataTypes.TEXT,
  email: DataTypes.STRING,
});
