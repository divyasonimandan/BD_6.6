import express from "express";
import { getAllMovies, getMovieById } from "./controllers/index.js";
const app = express();
app.use(cors());
app.use(express.json());

// 1: Retrieve All Movies.

app.get("movies", (req, res) => {
  let movies = getAllMovies();
  res.json(movies);
});

//2: Retrieve Movie by ID

app.get("movies/details/:id", (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  res.json(movie);
});

export { app };
