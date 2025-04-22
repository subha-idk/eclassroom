import Teacher from "../../models/Teacher.js";
import Student from "../../models/Student.js";
import bcrypt from "bcrypt";

const authenticateTeacher = async (email, password) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const validPassword = await bcrypt.compare(password, teacher.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  return teacher;
};

const authenticateStudent = async (roll, password) => {
  const student = await Student.findOne({ roll });
  if (!student) {
    throw new Error("Student not found");
  }

  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  return student;
};



export {authenticateStudent,authenticateTeacher}
