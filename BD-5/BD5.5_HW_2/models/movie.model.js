import { DataTypes, sequelize } from "../index.js";

export const movie = sequelize.define("movie", {
  title: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  director: DataTypes.TEXT,
  summary: DataTypes.TEXT,
});
