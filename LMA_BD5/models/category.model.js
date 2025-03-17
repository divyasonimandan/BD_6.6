import { DataTypes, sequelize } from "../lib/index.js";

export const category = sequelize.define("categories", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});
