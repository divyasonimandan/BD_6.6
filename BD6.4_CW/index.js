import express from "express";
import {
  getAllBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} from "./book.js";
const app = express();
app.use(express.json());

// 1: Get All Books.

app.get("/api/books", async (req, res) => {
  try {
    let books = await getAllBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2: Get Book by ID.

app.get("/api/books/:id", async (req, res) => {
  try {
    let book = await getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "No book found By ID" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3: Get All Reviews

app.get("/api/reviews", async (req, res) => {
  try {
    let reviews = await getAllReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4: Get Review by ID.

app.get("/api/reviews/:id", async (req, res) => {
  try {
    let review = await getReviewById(parseInt(req.params.id));
    if (!review)
      return res.status(404).json({ error: "No review found By ID" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 5: Get User by ID.

app.get("/api/users/:id", async (req, res) => {
  try {
    let user = await getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "No user found By ID" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { app };
