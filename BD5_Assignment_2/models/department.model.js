import { DataTypes, sequelize } from "../lib/index.js";

export const department = sequelize.define("department", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
