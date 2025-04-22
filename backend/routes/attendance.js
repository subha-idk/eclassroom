import express from 'express';
import { GET_ATTENDANCE_OF_PARTICULAR_CLASS, GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES,GET_ATTENDANCE_OF_PARTICULAR_DATE, GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE,GET_ATTENDANCE_BY_STUDENT_IN_DATE_RANGE} from '../controllers/attendance/getAttendance.js';

import { CREATE_ATTENDANCE_RECORD, UPDATE_ATTENDANCE_RECORD, DELETE_ATTENDANCE_RECORD} from '../controllers/attendance/manageAttendance.js';

const router = express.Router();

// Create Attendance Record
router.post('/create-attendance', CREATE_ATTENDANCE_RECORD);

// Update Attendance Record
router.put('/:attendanceId', UPDATE_ATTENDANCE_RECORD);

// Get Attendance Records by Class 
router.get('/class/:classId/', GET_ATTENDANCE_OF_PARTICULAR_CLASS);

router.get('/teacher/:teacherId/date/:date', GET_ATTENDANCE_OF_PARTICULAR_DATE);

// Get Attendance Records by Student on a particular date
router.get('/student/:studentId/date/:date', GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE);

// Get Attendance Records by Student of all classes
router.get('/student/:studentId', GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES);

// Get Attendance Records by Student in a date Range
router.get('/student/:studentId/start/:startDate/end/:endDate', GET_ATTENDANCE_BY_STUDENT_IN_DATE_RANGE);

// Delete Attendance Record
router.delete('/:attendanceId', DELETE_ATTENDANCE_RECORD);

export default router;
