import express from "express";
const app = express();

app.use(express.json());

let authors = [
    { authorId: 1, name: "George Orwell", book: "1984" },
    { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
    { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

export function getAuthors() {
    return authors;
}

export function getAuthorById(id) {
    return authors.find((author) => author.authorId === id);
}

export function addAuthor(author) {
    authors.push(author);
    return author;
}

// 1: Get all authors.

app.get("/authors", (req, res) => {
    res.json(getAuthors());
});

// 2: Get author by ID.

app.get("/authors/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let author = getAuthorById(id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
});

// 3: Push new author.

app.post("/authors/new", (req, res) => {
    let authorId = req.query.authorId;
    let name = req.query.name;
    let book = req.query.book;
    let addedAuthor = addAuthor({ authorId, name, book });
    res.status(201).json(addedAuthor);
});

export { app, getAuthors, getAuthorById, addAuthor };
