import bcrypt from "bcrypt";
import Student from "../../models/Student.js";

const ADD_STUDENT = async (req, res) => {
  try {
    const { name, roll, password,  section } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ roll });
    if (existingStudent) {
      return res.json({
        success: false,
        message: "Student already exists with this roll number.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      name,
      roll,
      password: hashedPassword,
      
      section,
    });

    // Save student to database
    await newStudent.save();

    res
      .status(201)
      .json({ success: true, message: "Student registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const UPDATE_STUDENT = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, roll, dob, section, password } = req.body;

    // Find the student by ID in the database
    let student = await Student.findById(studentId);

    // If student is not found, return a 404 error
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    // Update the student's details
    student.name = name || student.name;
    student.roll = roll || student.roll;
    student.dob = dob || student.dob;
    student.section = section || student.section;

    // Update password if provided
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    // Save the updated student to the database
    await student.save();

    // Return the updated student as JSON response
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error updating student:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const DELETE_STUDENT = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student by ID in the database
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    // If student is not found, return a 404 error
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

   

    // Return success message
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const DELETE_ALL_STUDENT = async (req, res) => {
  try {
    // Delete all entries in the Student collection
    const result = await Student.deleteMany({});

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res
        .json({ success: false, message: "No Student found to delete." });
    }

    // Return success message
    res
      .status(200)
      .json({ success: true, message: "All students deleted successfully." });
  } catch (error) {
    console.error("Error deleting all students:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export { ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT ,DELETE_ALL_STUDENT};
