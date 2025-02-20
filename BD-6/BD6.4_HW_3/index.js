import express from "express";
import {
    getAllArticles,
    getArticleById,
    getAllComments,
    getCommentById,
    getUserById,
} from "./article.js";
const app = express();

app.use(express.json());

// 1: Get All Articles

app.get("/articles", async (req, res) => {
    try {
        let articles = await getAllArticles();
        if (articles.length === 0)
            return res.status(404).json({ error: "No articles found" });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 2 : Get Article by ID

app.get("/articles/:id", async (req, res) => {
    try {
        let article = await getArticleById(parseInt(req.params.id));
        if (!article)
            return res.status(404).json({ error: "No article found by Id" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3 : Get All Comments.

app.get("/comments", async (req, res) => {
    try {
        let comments = await getAllComments();
        if (comments.length === 0)
            return res.status(404).json({ error: "No comments found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4 : Get Comment by ID.

app.get("/comments/:id", async (req, res) => {
    try {
        let comment = await getCommentById(parseInt(req.params.id));
        if (!comment)
            return res.status(404).json({ error: "No comment found by Id" });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 5 : Get User by ID.

app.get("/users/:id", async (req, res) => {
    try {
        let user = await getUserById(parseInt(req.params.id));
        if (!user)
            return res.status(404).json({ error: "No user found by Id" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { app };
