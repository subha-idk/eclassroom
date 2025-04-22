import Express from "express";
import {authenticateStudent,authenticateTeacher} from "../controllers/auth/login.js"

import  jwt  from "jsonwebtoken";

const router = Express.Router();

router.post("/teacher/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await authenticateTeacher(email, password);
    const token = jwt.sign(
      { userId: teacher._id },
      process.env.SECRET_KEY_FOR_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ success: true, token: token, user: teacher,message:"Teacher login Successful" });
  } catch (error) {
    // console.error("Teacher login failed:", error.message);
    res      
      .json({ success: false, message: "Teacher authentication failed" });
  }
});

router.post("/student/login", async (req, res) => {
        try {
                const { rollNumber, password } = req.body;
                const student = await authenticateStudent(rollNumber, password);
                const token = jwt.sign({ userId: student._id }, process.env.SECRET_KEY_FOR_TOKEN, { expiresIn: '1h' });
                res.status(200).json({ success: true, token:token,user:student ,message:"Student login Successful"});
              } catch (error) {
                console.error('Student login failed:', error.message);
                res.json({ success: false, message: 'Student authentication failed' });
              }
});

export default router;
