import { DataTypes, sequelize } from "../index.js";

export const author = sequelize.define("author", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
});
