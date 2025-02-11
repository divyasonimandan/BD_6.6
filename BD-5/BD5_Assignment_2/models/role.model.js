import { DataTypes, sequelize } from "../lib/index.js";

export const role = sequelize.define("role", {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
