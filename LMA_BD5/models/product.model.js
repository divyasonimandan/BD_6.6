import { DataTypes, sequelize } from "../lib/index";
import { Supplier } from "./Supplier.model.js";
import { Category } from "./category.model.js";

export const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

// Define associations
Product.belongsTo(Supplier, {
  foreignKey: {
    name: "supplierId",
    allowNull: false,
  },
});

Supplier.hasMany(Product, { foreignKey: "supplierId" });

Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });

