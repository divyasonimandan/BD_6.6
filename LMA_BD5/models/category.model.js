import { DataTypes, sequelize } from "../lib/index.js";

export const category = sequelize.define("category", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});
