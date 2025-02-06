import { DataTypes, sequelize } from "../lib/index.js";

export const ticket = sequelize.define("ticket", {
  ticketId: DataTypes.INTEGER,
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  status: DataTypes.TEXT,
  priority: DataTypes.INTEGER,
  customerId: DataTypes.INTEGER,
  agentId: DataTypes.INTEGER,
});
