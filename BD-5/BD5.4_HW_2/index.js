import express from "express";
import { student } from "./lib/models/student.model.js";
import { sequelize } from "./lib/index.js";
import { course } from "./lib/models/course.model.js";

let app = express();
app.use(express.json());

const courses = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

const students = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(students);
    await course.bulkCreate(courses);

    res.status(200).json({ message: "Database seeding successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// 1: Create New Student.

async function addNewStudent(newStudent) {
  let newStudentData = await student.create(newStudent);
  return { newStudentData };
}

app.get("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Update Student by ID.

async function updateStudentById(id, newStudentData) {
  let studentDetails = await student.findOne({ where: { id } });
  if (!studentDetails) {
    return {};
  }
  studentDetails.set(newStudentData);
  let updatedStudent = await studentDetails.save();
  return { message: "Student updated successfully", updatedStudent };
}

app.get("/students/update/:id", async (req, res) => {
  try {
    let newStudentData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateStudentById(id, newStudentData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
