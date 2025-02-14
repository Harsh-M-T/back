const mongoose = require("mongoose");

const pairSchema = new mongoose.Schema({
  receiverId: { type: String, required: true }, // ID of the receiver
  senderId: { type: String, required: true }, // ID of the sender
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Pair", pairSchema);