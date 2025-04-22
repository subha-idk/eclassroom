import express from "express";
const router = express.Router();
import Subject from "../models/Subjects.js";

// Route for getting all subjects
router.get("", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({ success: true, subjects: subjects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Route for creating a new subject
router.post("", async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
  });

  try {
    const newSubject = await subject.save();
    res
      .status(201)
      .json({ success: true, message: "Subject Created Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Route for deleting a subject by ID
router.delete("/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    res.json({ success: true, message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
