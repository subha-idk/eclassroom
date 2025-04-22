import Attendance from "../../models/Attendance.js";

const CREATE_ATTENDANCE_RECORD = async (req, res) => {
  try {
    const { classId, attendanceRecords } = req.body;

    

    // Create a new attendance record
    const newAttendance = new Attendance({
      classId,
      attendanceRecords,
    });

    // Save the new attendance record to the database
    await newAttendance.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Attendance record created successfully.",
    });
  } catch (error) {
    res.json({ success: false, message: "Internal server error." });
  }
};
const UPDATE_ATTENDANCE_RECORD = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { classId, attendanceRecords } = req.body;

    // Find the attendance record by its ID
    let attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found." });
    }

    // Update attendance record fields
    attendance.classId = classId || attendance.classId;
    attendance.attendanceRecords =
      attendanceRecords || attendance.attendanceRecords;

    // Save the updated attendance record
    await attendance.save();

    // Respond with success message
    res.json({
      success: true,
      message: "Attendance record updated successfully.",
    });
  } catch (error) {
    console.error("Error updating attendance record:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const DELETE_ATTENDANCE_RECORD = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    // Find the attendance record by its ID and delete it
    await Attendance.findByIdAndDelete(attendanceId);

    // Respond with success message
    res.json({
      success: true,
      message: "Attendance record deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export {
  CREATE_ATTENDANCE_RECORD,
  UPDATE_ATTENDANCE_RECORD,
  DELETE_ATTENDANCE_RECORD,
};
