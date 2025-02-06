import express from "express";
import { sequelize } from "./lib/index.js";
import { book } from "./models/book.model.js";
import { user } from "./models/user.model.js";
import { like } from "./models/like.model.js";
import { Op } from "@sequelize/core";

const app = express();
app.use(express.json());

let books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
    await user.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });
    res.status(200).json("data seeded successfully..!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Exercise 1: Like a Book
async function likeBook(data) {
  let newLike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return { message: "book liked!", newLike };
}

app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let response = await likeBook({ userId, bookId });
    if (!response.message) {
      return res.status(404).json("No Book Liked!");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Book
async function dislikeBook(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });
  if (count === 0) return {};
  return { message: "book disliked!" };
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let response = await dislikeBook({ userId, bookId });
    if (!response.message) {
      res.status(404).json("book not in liked list.");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Books
async function getAllLikedBooks(userId) {
  let bookIds = await like.findAll({
    where: { userId },
    attributes: ["bookId"],
  });

  let bookRecords = [];
  for (let i = 0; i < bookIds.length; i++) {
    bookRecords.push(bookIds[i].bookId);
  }

  let likedBooks = await book.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });
  return { likedBooks };
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedBooks(userId);
    if (response.likedBooks.length === 0) {
      res.status(404).json("No liked books found.");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
