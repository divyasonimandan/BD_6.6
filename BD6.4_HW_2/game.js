let games = [
  { id: 1, title: "The Legend of Zelda", genreId: 1 },
  { id: 2, title: "Super Mario Bros", genreId: 2 },
];

let genres = [
  { id: 1, name: "Action-Adventure" },
  { id: 2, name: "Platformer" },
];

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function getAllGenres() {
  return genres;
}

async function getGenreById(id) {
  return genres.find((genre) => genre.id === id);
}

export { getAllGames, getGameById, getAllGenres, getGenreById };
