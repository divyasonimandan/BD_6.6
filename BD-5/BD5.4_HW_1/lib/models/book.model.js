import { DataTypes, sequelize } from "../index.js";

export const book = sequelize.define("book", {
  title: DataTypes.STRING,
  genre: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
});
