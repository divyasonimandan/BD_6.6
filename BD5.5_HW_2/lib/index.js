import sq from "sequelize";

export const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5.5_HW_2/database.sqlite",
});

export const DataTypes = sq.DataTypes;
