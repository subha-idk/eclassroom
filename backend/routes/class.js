import express from 'express';
import { GET_CLASS, GET_CLASSES,GET_CLASS_BY_TEACHER,GET_CLASS_BY_STUDENT, GET_CLASS_BY_TEACHER_ON_PARTICULAR_DATE, GET_CLASS_BY_STUDENT_ON_PARTICULAR_DATE } from '../controllers/class/getClass.js';
import { CREATE_CLASS,UPDATE_CLASS, DELETE_CLASS } from '../controllers/class/manageClass.js';

const router = express.Router();

// Route to create a new class
router.post('/create-class', CREATE_CLASS);

// Route to get all classes
router.get('/', GET_CLASSES);

// Route to get a class by its ID
router.get('/:classId', GET_CLASS);

// Route to update a class by its ID
router.put('/:classId', UPDATE_CLASS);

// Route to delete a class by its ID
router.delete('/:classId', DELETE_CLASS);

// Route to get a class by Teacher id
router.get('/teacher/:teacherId', GET_CLASS_BY_TEACHER);


// Route to get a class by Teacher id on a particular date
router.get('/teacher/:teacherId/date/:date', GET_CLASS_BY_TEACHER_ON_PARTICULAR_DATE);


// Route to get a class by Student id 

// check if needed
router.get('/student/:studentId', GET_CLASS_BY_STUDENT);


// Route to get a class by Student id on a particular date
router.get('/student/:studentId/date/:date', GET_CLASS_BY_STUDENT_ON_PARTICULAR_DATE);

export default router;
