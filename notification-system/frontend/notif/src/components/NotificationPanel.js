import React, { useState, useEffect } from "react";
import { Bell, Trash2, Check } from "lucide-react"; // Import Check icon for the Accept button
import axios from "axios";
import "./NotificationPanel.css";
import mongoose from "mongoose";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(true);

  const user = {
    id: mongoose.Schema.ObjectId, 
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Toggle notification panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
    setHasNew(false);
  };

  // Delete a notification
  const removeNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(notifications.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleAccept = async (notification) => {
    try {
      // Send a POST request to the backend to save the receiver and sender IDs
      const response = await axios.post("http://localhost:5000/api/accept-notification", {
        receiverId: user.id , // Logged-in user's ID (receiver)
        senderId: notification.senderId, // Sender's ID from the notification
      });

      console.log("IDs saved:", response.data);

      // Optionally, remove the notification after accepting
      removeNotification(notification._id);
    } catch (error) {
      console.error("Error saving IDs:", error);
    }
  };

  return (
    <div className="notification-panel-container">
      {/* Notification Bell Button */}
      <button onClick={togglePanel} className="notification-bell-button">
        <Bell className="notification-bell-icon" />
        
        {/* Red Dot Indicator for New Notifications */}
        {hasNew && <span className="red-dot-indicator"></span>}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="notification-panel">
          <div className="notification-panel-header">
            <h2>Notifications</h2>
            <button onClick={togglePanel}>
              <Bell className="notification-bell-icon" />
            </button>
          </div>
          
          <div className="notification-panel-content">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification._id} className="notification-item">
                  <div>
                    <p className="notification-message">{notification.message}</p>
                    <p className="notification-time">{notification.time}</p>
                  </div>
                  <div className="notification-actions">
                    <button
                      onClick={() => handleAccept(notification)}
                      className="accept-button"
                    >
                      <Check className="h-5 w-5" /> Accept
                    </button>
                    <button
                      onClick={() => removeNotification(notification._id)}
                      className="delete-button"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-notifications">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;