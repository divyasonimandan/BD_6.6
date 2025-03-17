import express from "express";
import cors from "cors";
import { getAllBooks, getBookById } from "./controllers/index.js";
const app = express();
app.use(cors());
app.use(express.json());

// 1: Retrieve All Books.

app.get("/books", (req, res) => {
  let books = getAllBooks();
  res.json({ books });
});

// 2: Retrieve Book by ID.

app.get("/books/details/:id", (req, res) => {
  let book = getBookById(parseInt(req.params.id));
  res.json({ book });
});

export { app };
