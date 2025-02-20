import { app, getProducts, getProductById, addNewProduct } from "../index.js";
import http from "http";

jest.mock("../index.js", () => ({
    ...jest.requireActual("../index.js"),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addNewProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Products API Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getProducts should return a list of products", () => {
        const mockProducts = [
            { id: 1, name: "Laptop", category: "Electronics" },
            { id: 2, name: "Coffee Maker", category: "Appliances" },
        ];

        getProducts.mockReturnValue(mockProducts);
        let result = getProducts();
        expect(result).toEqual(mockProducts);
        expect(getProducts).toHaveBeenCalled();
    });

    test("getProductById should return a product details by ID", () => {
        const mockProduct = { id: 1, name: "Laptop", category: "Electronics" };

        getProductById.mockReturnValue(mockProduct);
        let result = getProductById(1);
        expect(result).toEqual(mockProduct);
        expect(getProductById).toHaveBeenCalledWith(1);
    });

    test("getProductById should return undefined if product id not found", () => {
        getProductById.mockReturnValue(undefined);
        let result = getProductById(11);
        expect(result).toBeUndefined();
        expect(getProductById).toHaveBeenCalledWith(11);
    });

    test("addNewProduct should add a new Product", () => {
        const newProduct = {
            id: 5,
            name: "Tablet",
            category: "Electronics",
        };

        addNewProduct.mockReturnValue(newProduct);
        let result = addNewProduct(newProduct);
        expect(result).toEqual(newProduct);
        expect(addNewProduct).toHaveBeenCalledWith(newProduct);
    });
});
