import express from "express";
import { getBooks, getBookById, addBook } from "./book.js";
const app = express();
const PORT = 3000;

app.use(express.json());

// 1: Get all books.
app.get("/api/books", (req, res) => {
  res.json(getBooks());
});

//2: Get book by ID.
app.get("/api/books/:id", (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// 3: Add new book.
app.post("/api/books", (req, res) => {
  const book = addBook(req.body);
  res.status(201).json(book);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
