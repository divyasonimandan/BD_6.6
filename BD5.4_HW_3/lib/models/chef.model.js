import { DataTypes, sequelize } from "../index.js";

export const chef = sequelize.define("chef", {
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
