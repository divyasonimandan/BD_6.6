import { DataTypes, sequelize } from "../lib/index.js";

export const customer = sequelize.define("customer", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
