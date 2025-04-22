import Teacher from "../../models/Teacher.js";

const GET_TEACHERS = async (req, res) => {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find();

    // Return the list of teachers as JSON response
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const GET_TEACHER = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find the teacher by ID in the database
    const teacher = await Teacher.findById(teacherId);

    // If teacher is not found, return a 404 error
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found." });
    }

    // Return the teacher details as JSON response
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { GET_TEACHERS, GET_TEACHER };
