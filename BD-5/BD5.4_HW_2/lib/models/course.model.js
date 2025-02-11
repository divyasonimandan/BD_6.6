import { DataTypes, sequelize } from "../index.js";

export const course = sequelize.define("course", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});
