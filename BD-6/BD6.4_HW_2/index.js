import express from "express";
import {
    getAllGames,
    getGameById,
    getAllGenres,
    getGenreById,
} from "./game.js";
const app = express();

app.use(express.json());

// 1: Get All Games

app.get("/api/games", async (req, res) => {
    try {
        let games = await getAllGames();
        if (games.length === 0)
            return res.status(404).json({ error: "No games found" });
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 2: Get Game by ID.

app.get("/api/games/:id", async (req, res) => {
    try {
        let game = await getGameById(parseInt(req.params.id));
        if (!game)
            return res.status(404).json({ error: "No game found by Id" });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3: Get All Genres.

app.get("/api/genres", async (req, res) => {
    try {
        let genres = await getAllGenres();
        if (genres.length === 0)
            return res.status(404).json({ error: "No genres found" });
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4: Get Genre by ID.

app.get("/api/genres/:id", async (req, res) => {
    try {
        let genre = await getGenreById(parseInt(req.params.id));
        if (!genre)
            return res.status(404).json({ error: "No genre found by Id" });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { app };
