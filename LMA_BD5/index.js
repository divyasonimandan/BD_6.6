import express from "express";
import { sequelize } from "./lib/index.js";
import { supplier } from "./models/supplier.model.js";
import { category } from "./models/category.model.js";

import { productCategory } from "./models/ProductCategory.model.js";
import { product } from "./models/product.model.js";

const app = express();
app.use(express.json());

const suppliersData = [
  {
    name: "TechSupplies",
    contact: "John Doe",
    email: "contact@techsupplies.com",
    phone: "123-456-7890",
  },
  {
    name: "HomeGoods Co.",
    contact: "Jane Smith",
    email: "contact@homegoodsco.com",
    phone: "987-654-3210",
  },
];

const productsData = [
  {
    name: "Laptop",
    description: "High-performance laptop",
    quantityInStock: 50,
    price: 120099,
    supplierId: 1,
  },
  {
    name: "Coffee Maker",
    description: "12-cup coffee maker",
    quantityInStock: 20,
    price: 45000,
    supplierId: 2,
  },
];

const categoriesData = [
  { name: "Electronics", description: "Devices and gadgets" },
  {
    name: "Kitchen Appliances",
    description: "Essential home appliances for kitchen",
  },
];

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await supplier.bulkCreate(suppliersData);
    await category.bulkCreate(categoriesData);
    await product.bulkCreate(productsData);
    res.status(200).json("data seeded successfully..!");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
