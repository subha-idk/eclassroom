// Import necessary modules
import express from "express";
const router = express.Router();
import Notification from "../models/Notifications.js";

// Route to create a new notification
router.post("/", async (req, res) => {
  try {
    const { section, message, teacherId } = req.body;
    const notification = new Notification({ section, message, teacherId });
    await notification.save();
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Route to get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a specific notification by ID
router.get("/teacher/:teacherId", getNotification, (req, res) => {
  res.json({ success: true, data: res.notification });
});

// Middleware to fetch a notification by ID
async function getNotification(req, res, next) {
  let notification;
  try {
    notification = await Notification.find({
      teacherId: req.params.teacherId,
    }).populate("teacherId");
    if (notification == null) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  res.notification = notification;
  next();
}

// GET /notifications/section/:section
router.get("/section/:section", async (req, res) => {
  try {
    const section = req.params.section;
    const notifications = await Notification.find({ section: section }).populate("teacherId","name" );
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Route to delete a notification
router.delete("/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
