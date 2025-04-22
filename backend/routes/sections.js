// Import necessary modules
import express from "express";
const router = express.Router();
import Section from "../models/Section.js";

// Route for creating a new section
router.post("", async (req, res) => {
  try {
    const { dept, shift } = req.body;
    const section = new Section({ dept, shift });
    await section.save();
    res
      .status(201)
      .json({ success: true, message: "Section Added Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Route for retrieving all sections
router.get("", async (req, res) => {
  try {
    const sections = await Section.find();
    res.json({ success: true, section: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Route for retrieving a specific section by ID
router.get("/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (section == null) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for updating a specific section by ID
router.patch("/:id", async (req, res) => {
  try {
    const { dept, shift } = req.body;
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      { dept, shift },
      { new: true }
    );
    res.json(updatedSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a specific section by ID
router.delete("/:id", async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Section deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
