const Notification = require("../models/Notification");
const Pair = require("../models/Pair");

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Add a new notification
const addNotification = async (req, res) => {
  const { message } = req.body;
  try {
    const newNotification = new Notification({ message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Error adding notification", error });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

const acceptNotification = async (req, res) => {
    const { receiverId, senderId } = req.body;
  
    // Validate request body
    if (!receiverId || !senderId) {
      return res.status(400).json({ message: "Missing required fields: receiverId, senderId" });
    }
  
    try {
      // Save the receiver and sender IDs as a pair
      const newPair = new Pair({ receiverId, senderId });
      await newPair.save();
  
      res.status(201).json({ message: "IDs saved successfully", pair: newPair });
    } catch (error) {
      console.error("Error saving IDs:", error);
      res.status(500).json({ message: "Error saving IDs", error });
    }
  };
  
  module.exports = {
    getNotifications,
    addNotification,
    deleteNotification,
    acceptNotification,
  };