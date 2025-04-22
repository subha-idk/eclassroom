import Class from "../../models/Class.js";

const GET_CLASSES = async (req, res) => {
  try {
    // Fetch all classes from the database
    const classes = await Class.find();

    // Return success response with the list of classes as JSON
    res.status(200).json({ success: true, date: classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_CLASS = async (req, res) => {
  try {
    const { classId } = req.params;

    // Find the class by ID in the database
    const foundClass = await Class.findById(classId);

    // If class is not found, return a 404 error
    if (!foundClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found." });
    }

    // Return success response with the class details as JSON
    res.status(200).json({ success: true, data: foundClass });
  } catch (error) {
    console.error("Error fetching class:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_CLASS_BY_TEACHER = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Query classes based on the teacher's ID
    const classes = await Class.find({ teacherId }).sort({ _id  : -1 });


    // Return success response with the list of classes as JSON
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_CLASS_BY_TEACHER_ON_PARTICULAR_DATE = async (req, res) => {
  try {
    const { teacherId, date } = req.params;

    // Parse the date string into a JavaScript Date object
    const [day, month, year] = date.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      // If the parsed date is invalid, return an error response
      return res.status(400).json({ success: false, message: "Invalid date format." });
    }

    // Query classes based on the teacher's ID and parsed date
    const classes = await Class.find({
      teacherId: teacherId,
      date: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)), // Start of the provided date
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999)) // End of the provided date
      }
    });

    // Return success response with the list of classes as JSON
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_CLASS_BY_STUDENT = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Query classes where the student attended
    const classes = await Class.find({ studentIds: studentId,date:new Date(date) });

    // Return success response with the list of classes as JSON
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_CLASS_BY_STUDENT_ON_PARTICULAR_DATE = async (req, res) => {
  try {
    const { studentId, date } = req.params;

    // Parse the date string into a JavaScript Date object
    const parsedDate = new Date(date);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      // If the parsed date is invalid, return an error response
      return res.status(400).json({ success: false, message: "Invalid date format." });
    }

    // Set the time to start of the day (00:00:00)
    parsedDate.setUTCHours(0, 0, 0, 0);


    // Find classes attended by the student on the particular date
    const classes = await Class.find({
      // studentIds: studentId,
      date: parsedDate
    });

    // Return success response with the list of classes as JSON
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};





export { GET_CLASS, GET_CLASSES ,GET_CLASS_BY_TEACHER,GET_CLASS_BY_STUDENT,GET_CLASS_BY_STUDENT_ON_PARTICULAR_DATE,GET_CLASS_BY_TEACHER_ON_PARTICULAR_DATE};
