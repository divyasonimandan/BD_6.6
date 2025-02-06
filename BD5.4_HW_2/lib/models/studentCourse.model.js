import { DataTypes, sequelize } from "../index.js";
import { student } from "./student.model.js";
import { course } from "./course.model.js";

export const studentCourse = sequelize.define("studentCourse", {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: course,
      key: "id",
    },
  },
});

student.belongsToMany(course, { through: studentCourse });
course.belongsToMany(student, { through: studentCourse });
