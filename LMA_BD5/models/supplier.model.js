import { DataTypes, sequelize } from "../lib/index.js";

export const supplier = sequelize.define("supplier", {
  name: DataTypes.TEXT,
  contact: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: DataTypes.STRING,
});
