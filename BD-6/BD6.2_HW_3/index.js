import express from "express";
const app = express();

app.use(express.json());

let products = [
    { id: 1, name: "Laptop", category: "Electronics" },
    { id: 2, name: "Coffee Maker", category: "Appliances" },
    { id: 3, name: "Headphones", category: "Electronics" },
    { id: 4, name: "Running Shoes", category: "Footwear" },
];

// 1: Get All Products.

function getProducts() {
    return products;
}

app.get("/products", (req, res) => {
    res.json(getProducts());
});

// 2: Get Product by ID.

function getProductById(id) {
    return products.find((product) => product.id === id);
}

app.get("/products/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let product = getProductById(id);
    if (!product)
        return res
            .status(404)
            .json({ message: "No product found by ID " + id });
    res.json(product);
});

// 3: Add New Product.

function addNewProduct(product) {
    products.push(product);
    return product;
}

app.post("/products/new", (req, res) => {
    let { id, name, category } = req.body;
    let newProduct = addNewProduct({ id, name, category });
    res.status(201).json(newProduct);
});

export { app, getProducts, getProductById, addNewProduct };
