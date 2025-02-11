import { DataTypes, sequelize } from "../index.js";

export const dish = sequelize.define("dish", {
  name: DataTypes.STRING,
  cuisine: DataTypes.STRING,
  preparaion_time: DataTypes.INTEGER,
});
