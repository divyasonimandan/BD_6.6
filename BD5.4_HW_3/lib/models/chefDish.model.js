import { DataTypes, sequelize } from "../index.js";
import { chef } from "./chef.model.js";
import { dish } from "./dish.model.js";

export const chefDish = sequelize.define("chefDish", {
  chefId: {
    type: DataTypes.INTEGER,
    references: {
      model: chef,
      key: "id",
    },
  },
  dishId: {
    type: DataTypes.INTEGER,
    references: {
      model:dish,
      key: "id",
    },
  },
});

chef.belongsToMany(dish, { through: chefDish });
dish.belongsToMany(chef, { through: chefDish });
