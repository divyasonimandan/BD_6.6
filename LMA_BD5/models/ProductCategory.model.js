import { DataTypes, sequelize } from "../lib/index.js";

export const productCategory = sequelize.define(
  "productCategory",
  {},
  { timestamps: false },
);
