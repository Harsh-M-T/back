const express = require("express");
const {
  getNotifications,
  addNotification,
  deleteNotification,
  acceptNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", getNotifications); // GET /api/notifications
router.post("/", addNotification); // POST /api/notifications
router.delete("/:id", deleteNotification); // DELETE /api/notifications/:id
router.post("/accept-notification", acceptNotification); // POST /api/accept-notification

module.exports = router;