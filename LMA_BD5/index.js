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
    await productCategory.bulkCreate({});
    res.status(200).json("data seeded successfully..!");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 1: Create a New Supplier (POST ).

async function addNewSupplier(suppliersData) {
  let newSupplier = await supplier.create(suppliersData);
  return { newSupplier };
}

app.post("/suppliers/new", async (req, res) => {
  try {
    let newSupplier = req.body.newSupplier;
    let response = await addNewSupplier(newSupplier);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Create a New Product (POST )

async function addNewProduct(productsData) {
  let newProduct = await product.create(productsData);
  return { newProduct };
}

app.post("/products/new", async (req, res) => {
  try {
    let newProduct = req.body.newProduct;
    let response = await addNewProduct(newProduct);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Create a New Category(POST).

async function addNewCategory(categoriesData) {
  let newCategory = await category.create(categoriesData);
  return { newCategory };
}

app.post("/categories/new", async (req, res) => {
  try {
    let newCategory = req.body.newCategory;
    let response = await addNewCategory(newCategory);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Exercise 6: Update a Supplier (POST)

async function updatedSupplierById(updatedSupplier, id) {
  let supplierDetails = await supplier.findOne({ where: { id } });
  if (!supplierDetails) {
    return {};
  }
  supplierDetails.set(updatedSupplier);
  let updatedSupplierDetails = await supplierDetails.save();

  return { message: "Supplier updated successfully", updatedSupplierDetails };
}

app.post("/suppliers/:id/update", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newSupplier = req.body;
    let response = await updatedSupplierById(newSupplier, id);
    if (!response.message) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Delete a Supplier (POST)

async function deleteSuppliersById(id) {
  let destroyedSupplier = await supplier.destroy({ where: { id } });
  if (destroyedSupplier === 0) return {};
  return { message: "Supplier deleted successfully" };
}

app.post("/suppliers/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteSuppliersById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
