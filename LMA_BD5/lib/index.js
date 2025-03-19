import sq from "sequelize";

export const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./LMA_BD5/database.sqlite",
});

export const DataTypes = sq.DataTypes;
