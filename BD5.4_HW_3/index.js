import express from "express";
import { chef } from "./lib/models/chef.model.js";
import { sequelize } from "./lib/index.js";
import { dish } from "./lib/models/dish.model.js";

let app = express();
app.use(express.json());

const dishes = [
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    preparationTime: 20,
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    preparationTime: 50,
  },
  {
    name: "Poutine",
    cuisine: "Canadian",
    preparationTime: 30,
  },
];

const chefs = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await chef.bulkCreate(chefs);
    await dish.bulkCreate(dishes);

    res.status(200).json({ message: "Database seeding successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// 1: Create new chef.

async function addNewChef(newChef) {
  let newChefData = await chef.create(newChef);
  return { newChefData };
}

app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let response = await addNewChef(newChef);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Update chef by Id.

async function updateChefById(id, newChefData) {
  let chefDetails = await chef.findOne({ where: { id } });
  if (!chefDetails) {
    return {};
  }
  chefDetails.set(newChefData);
  let updatedChef = await chefDetails.save();
  return { message: "Chef updated successfully", updatedChef };
}

app.post("/chefs/update/:id", async (req, res) => {
  try {
    let newChefData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateChefById(id, newChefData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
