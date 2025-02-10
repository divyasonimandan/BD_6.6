import express from "express";
const app = express();

app.use(express.json());

let movies = [
    { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
    { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

// 1: Get all movies.

function getMovies() {
    return movies;
}

app.get("/movies", (req, res) => {
    res.json(getMovies());
});

// 2: Get movie by ID.

function getMovieById(id) {
    return movies.find((movie) => movie.id === id);
}

app.get("/movies/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let movie = getMovieById(id);
    if (!movie)
        return res.status(404).json({ message: "No movie found by ID " + id });
    res.json(movie);
});

// 3: Add new movie.

function addMovie(movie) {
    movies.push(movie);
    return movie;
}

app.post("/movies/new", (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let director = req.body.director;
    let newMovie = addMovie({ id, title, director });
    res.status(201).json(newMovie);
});

export { app, getMovies, getMovieById, addMovie };
