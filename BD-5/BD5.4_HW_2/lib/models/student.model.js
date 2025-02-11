import { DataTypes, sequelize } from "../index.js";

export const student = sequelize.define("student", {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

