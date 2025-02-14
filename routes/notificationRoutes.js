const express = require("express");
const {
  getNotifications,
  addNotification,
  deleteNotification,
} = require("../controllers/notificationController.js");

const router = express.Router();

router.get("/", getNotifications);
router.post("/", addNotification);
router.delete("/:id", deleteNotification);

module.exports = router;