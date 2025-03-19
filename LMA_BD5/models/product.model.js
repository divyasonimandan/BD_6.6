import { DataTypes, sequelize } from "../lib/index.js";
import { supplier } from "./supplier.model.js";
import { category } from "./category.model.js";

export const product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

// Define associations
product.belongsTo(supplier, {
  foreignKey: {
    name: "supplierId",
    allowNull: false,
  },
});

supplier.hasMany(product, { foreignKey: "supplierId" });

product.belongsToMany(category, { through: "productCategory" });
category.belongsToMany(product, { through: "productCategory" });
