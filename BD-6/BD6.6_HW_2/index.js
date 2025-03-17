import express from "express";
import cors from "cors";
import { getAllGames, getGameById } from "./controllers/index.js";
const app = express();
app.use(cors());
app.use(express.json());

// 1: Retrieve All Games

app.get("/games", (req, res) => {
  let games = getAllGames();
  res.json({ games });
});

// 2: Retrieve Game by ID

app.get("/games/details/:id", (req, res) => {
  let game = getGameById(parseInt(req.params.id));
  res.json({ game });
});

export { app };
