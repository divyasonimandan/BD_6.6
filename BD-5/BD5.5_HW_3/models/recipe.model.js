import { DataTypes, sequelize } from "../lib/index.js";

export const recipe = sequelize.define("recipe", {
  title: DataTypes.TEXT,
  chef: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  preparationTime: DataTypes.INTEGER,
  instructions: DataTypes.TEXT,
});
