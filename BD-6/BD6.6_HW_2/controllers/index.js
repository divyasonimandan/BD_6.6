let games = [
  {
    gameId: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    genre: "Adventure",
    platform: "Nintendo Switch",
  },
  {
    gameId: 2,
    title: "Red Dead Redemption 2",
    genre: "Action",
    platform: "PlayStation 4",
  },
  {
    gameId: 3,
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    platform: "PC",
  },
];

// functions...

function getAllGames() {
  return games;
}

function getGameById(id) {
  return games.find((game) => game.gameId === id);
}

export { getAllGames, getGameById };
