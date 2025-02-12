import express from "express";
const app = express();

app.use(express.json());

let recipes = [
    {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
    },
    {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
    },
];

// functions...

async function getAllRecipes() {
    return recipes;
}

async function getRecipeById(id) {
    return recipes.find((recipe) => recipe.id === id);
}

async function addNewRecipe(recipe) {
    recipe.id = recipes.length + 1;
    recipes.push(recipe);
    return recipe;
}

// 1 : Get All Recipes.

app.get("/recipes", async (req, res) => {
    let recipes = await getAllRecipes();
    res.json(recipes);
});

// 2 : Get Recipe by ID.

app.get("/recipes/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let recipe = await getRecipeById(id);
    if (!recipe)
        return res.status(404).json({ message: "No recipe found by Id " + id });
    res.json(recipe);
});

// 3 : Add a New Recipe.

app.post("/recipes/new", async (req, res) => {
    let newRecipe = await addNewRecipe(req.body);
    res.status(201).json(newRecipe);
});

export { app, getAllRecipes, getRecipeById, addNewRecipe };
