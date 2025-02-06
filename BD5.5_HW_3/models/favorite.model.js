import { DataTypes, sequelize } from "../lib/index.js";
import { recipe } from "./recipe.model.js";
import { user } from "./user.model.js";

export const favorite = sequelize.define("favorite", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: recipe,
      key: "id",
    },
  },
});

user.belongsToMany(recipe, { through: favorite });
recipe.belongsToMany(user, { through: favorite });
