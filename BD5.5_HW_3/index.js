import express from "express";
import { sequelize } from "./lib/index.js";
import { recipe } from "./models/recipe.model.js";
import { user } from "./models/user.model.js";
import { favorite } from "./models/favorite.model.js";
import { Op } from "@sequelize/core";

const app = express();
app.use(express.json());

const recipes = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await recipe.bulkCreate(recipes);
    await user.create({
      username: "foodlover",
      email: "foodlover@example.com",
      password: "securepassword",
    });
    res.status(200).json({ message: "data seeded successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1: Favorite a Recipe.

async function favoriteRecipe(data) {
  let newFavorite = await favorite.create({
    userId: data.userId,
    recipeId: data.recipeId,
  });
  return { message: "Recipe Favorited", newFavorite };
}

app.get("/users/:id/favorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let response = await favoriteRecipe({ userId, recipeId });
    if (!response.message) {
      res.status(404).json("No Recipe Favourited!");
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Unfavorite a Recipe.

async function unfavoriteRecipe(data) {
  let count = await favorite.destroy({
    where: {
      userId: data.userId,
      recipeId: data.recipeId,
    },
  });
  if (count === 0) return {};
  return { message: "Recipe Unfavorited!" };
}

app.get("/users/:id/unfavorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let response = await unfavoriteRecipe({ userId, recipeId });
    if (!response.message) {
      res.status(404).json("No Recipe Favourited!");
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3: Get All Favorited Recipes.

async function getAllFavoritedRecipes(userId) {
  let recipeIds = await favorite.findAll({
    where: { userId },
    attributes: ["recipeId"],
  });

  let recipeRecords = [];
  for (let i = 0; i < recipeIds.length; i++) {
    recipeRecords.push(recipeIds[i].recipeId);
  }

  let favoritedRecipes = await recipe.findAll({
    where: { id: { [Op.in]: recipeRecords } },
  });
  return { favoritedRecipes };
}

app.get("/users/:id/favorites", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllFavoritedRecipes(userId);
    if (response.favoritedRecipes.length === 0) {
      res.status(404).json("No favorite recipes found.");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
