import Attendance from "../../models/Attendance.js";
import Class from "../../models/Class.js";
import mongoose from "mongoose";

const GET_ATTENDANCE_OF_PARTICULAR_CLASS = async (req, res) => {
  try {
    const { classId } = req.params;

    // Find attendance records for the specified class ID
    const attendanceRecords = await Attendance.find({ classId });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords[0] });
  } catch (error) {
    console.error("Error getting attendance records by class:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_ATTENDANCE_OF_PARTICULAR_DATE = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Parse the date string to obtain a Date object
    const date = new Date(req.params.date);


    // Find classes on the given date


    const classes = await Class.find({
      teacherId: teacherId,
      classDate: date,
    });

    // If no classes found for the given date, return an empty array
    if (!classes || classes.length === 0) {
      return res.json({ message: "No classes found for the given date" });
    }

    // Extract classIds from the classes found
    const classIds = classes.map((cls) => cls._id);

    // Find attendance records for the classIds found
    const attendanceRecords = await Attendance.find({
      classId: { $in: classIds },
    }).populate("classId");

    res.json(attendanceRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// by student

const GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find attendance records for the specified student ID
    const attendanceRecords = await Attendance.find({
      "attendanceRecords.studentId": studentId,
    });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error(
      "Error getting attendance records by student across all classes:",
      error
    );
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE = async (
  req,
  res
) => {
  try {
    const { studentId, date } = req.params;

    // Parse the date string into a JavaScript Date object
    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Find attendance records for the specified student ID and date
    const attendanceRecords = await Attendance.find({
      "attendanceRecords.studentId": studentId,
      date: parsedDate,
    });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error(
      "Error getting attendance records by student and date:",
      error
    );
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const GET_ATTENDANCE_BY_STUDENT_IN_DATE_RANGE = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.params; // Assuming studentId, startDate, and endDate are provided in the query parameters

    // Validate input
    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.json({ success: false, message: "Invalid studentId" });
    }

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Both startDate and endDate are required",
        });
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find classes within the date range
    const classList = await Class.find({
      classDate: { $gte: start, $lte: end },
    });

    // Map attendance for each class
    const attendanceList = [];
    for (const cls of classList) {
      const attendance = await Attendance.findOne({
        classId: cls._id,
        "attendanceRecords.studentId": studentId,
      }).populate("classId");

      // If attendance record exists for the student, filter the attendanceRecords array
      if (
        attendance &&
        attendance.attendanceRecords &&
        attendance.attendanceRecords.length > 0
      ) {
        attendance.attendanceRecords = attendance.attendanceRecords.filter(
          (record) => record.studentId.toString() === studentId
        );
        attendanceList.push(attendance);
      }
    }

    res.json({ success: true, data: attendanceList });
  } catch (error) {
    // console.error("Error fetching attendance:", error);
    res.json({ success: false, message: "Server error" });
  }
};

export {
  GET_ATTENDANCE_OF_PARTICULAR_CLASS,
  GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES,
  GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE,
  GET_ATTENDANCE_OF_PARTICULAR_DATE,
  GET_ATTENDANCE_BY_STUDENT_IN_DATE_RANGE,
};
