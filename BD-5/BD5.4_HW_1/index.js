import express from "express";
import { book } from "./lib/models/book.model.js";
import { sequelize } from "./lib/index.js";
import { author } from "./lib/models/author.model.js";

let app = express();
app.use(express.json());

let books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authors = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
    await author.bulkCreate(authors);
    res.status(200).json({ message: "Database seeding successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// 1: Create New Author.

async function addNewAuthor(newAuthor) {
  let newAuthorData = await author.create(newAuthor);
  return { newAuthorData };
}

app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Update Author by ID

async function updateAuthorById(id, newAuthorData) {
  let authorDetails = await author.findOne({ where: { id } });
  if (!authorDetails) {
    return {};
  }
  authorDetails.set(newAuthorData);
  let updatedAuthor = await authorDetails.save();
  return { message: "Author updated successfully", updatedAuthor };
}

app.post("/authors/update/:id", async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateAuthorById(id, newAuthorData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
