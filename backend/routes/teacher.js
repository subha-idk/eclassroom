import express from "express";
import {ADD_TEACHER,UPDATE_TEACHER,DELETE_TEACHER,DELETE_ALL_TEACHERS} from "../controllers/teacher/manageTeacher.js"
import {GET_TEACHER,GET_TEACHERS} from "../controllers/teacher/getTeacher.js"

const router = express.Router();

router.post("/add-teacher", ADD_TEACHER);
router.get("/", GET_TEACHERS);
router.get("/:teacherId", GET_TEACHER);
router.put("/:teacherId", UPDATE_TEACHER);
router.delete("/all", DELETE_ALL_TEACHERS);
router.delete("/:teacherId", DELETE_TEACHER);

export default router;
