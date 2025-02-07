 let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
  { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
];

export function getMovies() {
  return movies;
}

export function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

export function addMovie(movie) {
  let newMovie = { id: movies.length + 1, ...movie };
  movies.push(newMovie);
  return newMovie;
}
