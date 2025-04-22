import mongoose from 'mongoose';




const attendanceRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  attendanceStatus: { type: String, enum: ['present', 'absent'], required: true },
  // Other relevant fields
});

const attendanceSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  // date: { type: Date, required: true },
  attendanceRecords: [attendanceRecordSchema],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;