import { getProducts, getProductById, addProduct } from "./../product.js";

describe("Products Function", () => {
    it("Should get all products", () => {
        let products = getProducts();

        expect(products.length).toBe(4);
        expect(products).toEqual([
            { id: 1, name: "Laptop", category: "Electronics" },
            { id: 2, name: "Coffee Maker", category: "Appliances" },
            { id: 3, name: "Headphones", category: "Electronics" },
            { id: 4, name: "Running Shoes", category: "Footwear" },
        ]);
    });
    it("Should return an product by ID", () => {
        let product = getProductById(3);

        expect(product).toEqual({
            id: 3,
            name: "Headphones",
            category: "Electronics",
        });
    });

    it("Should return a undefined for a non-existant product", () => {
        let product = getProductById(9);

        expect(product).toBeUndefined();
    });

    it("Should add an product", () => {
        let newProduct = {
            name: "Tablet",
            category: "Electronics",
        };
        let addedProduct = addProduct(newProduct);
        expect(addedProduct).toEqual({
            id: 5,
            name: "Tablet",
            category: "Electronics",
        });

        const products = getProducts();
        expect(products.length).toBe(5);
    });
});
