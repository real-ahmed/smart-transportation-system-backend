# Notification Client-Side Integration Guide

This document outlines how to connect to the notification system from client applications.

## Installing Dependencies

```bash
npm install socket.io-client
```

## Basic Connection

```javascript
import { io } from 'socket.io-client';

// Connect to the notification socket
const notificationSocket = io('http://your-api-url/notifications', {
  query: {
    userId: 'current-user-id',
    organizationId: 'organization-id' // optional, if applicable
  },
  transports: ['websocket'],
  autoConnect: true
});

// Listen for connection events
notificationSocket.on('connect', () => {
  console.log('Connected to notification service');
});

notificationSocket.on('disconnect', () => {
  console.log('Disconnected from notification service');
});

// Listen for incoming notifications
notificationSocket.on('notification', (notification) => {
  console.log('New notification received:', notification);
  
  // Handle the notification (e.g., show a toast, update UI, etc.)
  showNotification(notification);
});

// Example function to display a notification
function showNotification(notification) {
  // This could be any UI library like toast, alert, etc.
  // Example using browser's Notification API (needs permission)
  if (Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '/path/to/icon.png'
    });
  }
}

// Cleanup on component unmount
function cleanup() {
  notificationSocket.disconnect();
}
```

## React Component Example

```jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationComponent = ({ userId, organizationId }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const notificationSocket = io('http://your-api-url/notifications', {
      query: {
        userId,
        organizationId
      },
      transports: ['websocket'],
      autoConnect: true
    });

    notificationSocket.on('connect', () => {
      console.log('Connected to notification service');
    });

    notificationSocket.on('notification', (notification) => {
      // Add new notification to the state
      setNotifications(prev => [notification, ...prev]);
      
      // You could also show a toast notification here
    });

    setSocket(notificationSocket);

    // Cleanup on unmount
    return () => {
      notificationSocket.disconnect();
    };
  }, [userId, organizationId]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://your-api-url/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Update the state to mark this notification as read
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('http://your-api-url/notifications/read-all', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Update all notifications in state as read
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button onClick={markAllAsRead}>Mark All as Read</button>
      </div>
      
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {notification.type === 'info' && <InfoIcon />}
                {notification.type === 'warning' && <WarningIcon />}
                {notification.type === 'alert' && <AlertIcon />}
                {notification.type === 'maintenance' && <MaintenanceIcon />}
                {notification.type === 'trip' && <TripIcon />}
              </div>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
```

## Fetching Existing Notifications

To load existing notifications on page load:

```javascript
// Fetch user's notifications
async function fetchNotifications(page = 1, limit = 10) {
  try {
    const response = await fetch(`http://your-api-url/notifications?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { results: [], totalCount: 0 };
  }
}

// Usage in React component
useEffect(() => {
  async function loadNotifications() {
    const notificationsData = await fetchNotifications();
    setNotifications(notificationsData.results);
    setTotalCount(notificationsData.totalCount);
  }
  
  loadNotifications();
}, []);
```

## API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/notifications` | GET | Get user notifications with pagination |
| `/notifications/:id` | GET | Get a specific notification |
| `/notifications/:id/read` | PATCH | Mark a notification as read |
| `/notifications/read-all` | PATCH | Mark all user notifications as read |
| `/notifications/:id` | DELETE | Delete a specific notification |
| `/notifications` | DELETE | Delete all user notifications | 