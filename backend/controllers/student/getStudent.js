import Student from "../../models/Student.js";

const GET_STUDENTS = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();

    // Return the list of students as JSON response
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_STUDENTS_BY_SECTION = async (req, res) => {
  try {
    const section = req.query.section;
    // Fetch all students from the database
    const students = await Student.find({section:section});

    // Return the list of students as JSON response
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const GET_STUDENT = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student by ID in the database
    const student = await Student.findById(studentId);

    // If student is not found, return a 404 error
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    // Return the student details as JSON response
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { GET_STUDENT, GET_STUDENTS,GET_STUDENTS_BY_SECTION };
