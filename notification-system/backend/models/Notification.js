const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String, default: () => new Date().toLocaleString() },
});

module.exports = mongoose.model("Notification", notificationSchema);