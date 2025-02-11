import { DataTypes, sequelize } from "../lib/index.js";

export const book = sequelize.define("book", {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  year: DataTypes.NUMBER,
  summary: DataTypes.TEXT,
});
