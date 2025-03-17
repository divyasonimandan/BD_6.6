import { DataTypes, sequelize } from "../lib/index.js";

export const ProductCategory = sequelize.define(
  "product_category",
  {},
  { timestamps: false },
);
