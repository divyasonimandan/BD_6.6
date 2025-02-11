import sq from "sequelize";

export const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export const DataTypes = sq.DataTypes;
