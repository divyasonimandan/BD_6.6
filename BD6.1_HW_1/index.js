import express from "express";
import { getMovies, getMovieById, addMovie } from "./movie.js";
const app = express();
const PORT = 3000;

app.use(express.json());

// 1: Get all movies.

app.get("/movies", (req, res) => {
  res.json(getMovies());
});

// 2: Get movie by ID.

app.get("/movies/:id", (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
});

// 3: Add new movie.

app.post("/movies", (req, res) => {
  const movie = addMovie(req.body);
  res.status(201).json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
