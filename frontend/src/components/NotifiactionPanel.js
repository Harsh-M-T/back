import React, { useState, useEffect } from "react";
import { Bell, Trash2 } from "lucide-react";
import axios from "axios";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(true);

  // Fetch notifications from the backend
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
                  <button
                    onClick={() => removeNotification(notification._id)}
                    className="delete-button"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
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