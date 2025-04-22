import bcrypt from "bcrypt";
import Teacher from "../../models/Teacher.js";

const ADD_TEACHER = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.json({
        success: false,
        message: "Teacher already exists with this email.",
      });
    }
    

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new teacher
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    // Save teacher to database
    await newTeacher.save();

    res
      .status(201)
      .json({ success: true, message: "Teacher registered successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const UPDATE_TEACHER = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { name, email, password } = req.body;

    // Find the teacher by ID in the database
    let teacher = await Teacher.findById(teacherId);

    // If teacher is not found, return a 404 error
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found." });
    }

    // Update the teacher's details
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;

    // Update password if provided
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      teacher.password = hashedPassword;
    }

    // Save the updated teacher to the database
    await teacher.save();

    // Return the updated teacher as JSON response
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.error("Error updating teacher:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const DELETE_TEACHER = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find the teacher by ID in the database and delete it
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    // If teacher is not found, return a 404 error
    if (!deletedTeacher) {
      return res
        .json({ success: false, message: "Teacher not found." });
    }

    // Return success message
    res
      .status(200)
      .json({ success: true, message: "Teacher deleted successfully." });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const DELETE_ALL_TEACHERS = async (req, res) => {
  try {
    // Delete all entries in the Teacher collection
    const result = await Teacher.deleteMany({});

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res
        .json({ success: false, message: "No teachers found to delete." });
    }

    // Return success message
    res
      .status(200)
      .json({ success: true, message: "All teachers deleted successfully." });
  } catch (error) {
    console.error("Error deleting all teachers:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export { ADD_TEACHER, UPDATE_TEACHER, DELETE_TEACHER ,DELETE_ALL_TEACHERS};
