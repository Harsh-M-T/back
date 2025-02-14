// const Notification = require("../models/Notification");

// // Get all notifications
// const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find();
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching notifications", error });
//   }
// };

// // Add a new notification
// const addNotification = async (req, res) => {
//   const { message } = req.body;
//   try {
//     const newNotification = new Notification({ message });
//     await newNotification.save();
//     res.status(201).json(newNotification);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding notification", error });
//   }
// };

// // Delete a notification
// const deleteNotification = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Notification.findByIdAndDelete(id);
//     res.status(200).json({ message: "Notification deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting notification", error });
//   }
// };

// module.exports = { getNotifications, addNotification, deleteNotification };

// backend/controllers/notificationController.js

const { getNotifications, removeNotification, addNotification } = require('../notifications');

// Get all notifications
const getAllNotifications = (req, res) => {
  const notifications = getNotifications();
  res.json(notifications);
};

// Delete a notification by ID
const deleteNotification = (req, res) => {
  const id = parseInt(req.params.id);
  removeNotification(id);
  res.status(200).send();
};

// Add a new notification
const createNotification = (req, res) => {
  const { message, time } = req.body;
  addNotification({ message, time });
  res.status(201).send();
};

module.exports = { getAllNotifications, deleteNotification, createNotification };
