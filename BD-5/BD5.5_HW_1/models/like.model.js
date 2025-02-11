import { DataTypes, sequelize } from "../lib/index.js";
import { book } from "./book.model.js";
import { user } from "./user.model.js";

export const like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: "id",
    },
  },
});

user.belongsToMany(book, { through: like });
book.belongsToMany(user, { through: like });
