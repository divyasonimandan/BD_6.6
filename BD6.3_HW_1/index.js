import express from "express";
const app = express();

app.use(express.json());

let games = [
    {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
    },
    {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
    },
];

let developers = [
    { id: 1, name: "Nintendo", country: "Japan" },
    { id: 2, name: "Nintendo", country: "Japan" },
];

// functions....

async function getAllGames() {
    return games;
}

async function getGameById(id) {
    return games.find((game) => game.id === id);
}

async function addNewGame(game) {
    game.id = games.length + 1;
    games.push(game);
    return game;
}

async function getDeveloperById(id) {
    return developers.find((developer) => developer.id === id);
}

async function addNewDeveloper(developer) {
    developer.id = developers.length + 1;
    developers.push(developer);
    return developer;
}

// 1: Get All Games.

app.get("/games", async (req, res) => {
    let games = await getAllGames();
    res.json(games);
});

// 2: Get Game by ID.

app.get("/games/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let game = await getGameById(id);
    if (!game)
        return res.status(404).json({ message: "No game found by ID " + id });
    res.json(game);
});

// 3: Add a New Game.

app.post("/games/new", async (req, res) => {
    let newGame = await addNewGame(req.body);
    res.status(201).json(newGame);
});

// 4: Get Developer by ID.

app.get("/developers/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let developer = await getDeveloperById(id);
    if (!developer)
        return res
            .status(404)
            .json({ message: "No developer found by ID " + id });
    res.json(developer);
});

// 5: Add a New Developer.

app.post("/developers/new", async (req, res) => {
    let newDeveloper = await addNewDeveloper(req.body);
    res.status(201).json(newDeveloper);
});

export {
    app,
    getAllGames,
    getGameById,
    addNewGame,
    getDeveloperById,
    addNewDeveloper,
};
