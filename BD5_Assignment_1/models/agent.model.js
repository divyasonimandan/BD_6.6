import { DataTypes, sequelize } from "../lib/index.js";

export const agent = sequelize.define("agent", {
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
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
