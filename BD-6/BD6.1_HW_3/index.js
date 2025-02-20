import express from "express";
import { getProducts, getProductById, addProduct } from "./product.js";
const app = express();
const PORT = 3000;

app.use(express.json());

// 1: Get all products.

app.get("/products", (req, res) => {
    res.json(getProducts());
});

// 2: Get product by ID.

app.get("/products/:id", (req, res) => {
    const product = getProductById(parseInt(req.params.id));
    if (!product)
        return res
            .status(404)
            .json({ message: "Product not found by ID" + id });
    res.json(product);
});

// 3: Push new product.

app.post("/products", (req, res) => {
    const product = addProduct(req.body);
    res.status(201).json(product);
});

app.listen(PORT, () => {
    console.log("server is running on port 3000");
});

export default app;
