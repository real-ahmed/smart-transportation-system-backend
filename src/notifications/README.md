# Notification System

This module provides a comprehensive notification system for the Smart Transportation platform. It allows sending real-time notifications to users and organizations, with both REST API endpoints and WebSocket support for live updates.

## Features

- Send notifications to specific users
- Send notifications to users by role (drivers, supervisors, students, members)
- Organization-wide notifications
- Real-time notifications via WebSockets
- Categorized notifications (info, warning, alert, maintenance, trip, system)
- Mark notifications as read/unread
- Delete notifications

## Usage

### 1. Import the Notification Module

To use notifications in your module, import the `NotificationsModule`:

```typescript
import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    // Other modules...
  ],
  // ...
})
export class YourModule {}
```

### 2. Inject the NotificationEventsService

Inject the `NotificationEventsService` in your service:

```typescript
import { Injectable } from '@nestjs/common';
import { NotificationEventsService } from 'src/notifications/notification-events.service';
import { NotificationType } from 'src/notifications/notification.schema';

@Injectable()
export class YourService {
  constructor(
    private readonly notificationEvents: NotificationEventsService,
    // Other dependencies...
  ) {}

  // Your service methods...
}
```

### 3. Send Notifications

The `NotificationEventsService` provides several methods to send notifications:

#### Basic User Notification

```typescript
// Send a basic notification to a user
await this.notificationEvents.notifyUser(
  userId,             // User ID
  'Notification Title',
  'Notification message content',
  NotificationType.INFO,  // Optional: defaults to INFO
  { additionalData: 'value' }  // Optional: additional data object
);
```

#### Organization Notification

```typescript
// Send a notification in an organization context
await this.notificationEvents.notifyOrganization(
  organizationId,     // Organization ID
  userId,             // User ID
  'Notification Title',
  'Notification message content',
  NotificationType.INFO,  // Optional
  { additionalData: 'value' }  // Optional
);
```

#### Trip Notification

```typescript
// Send a trip-related notification
await this.notificationEvents.notifyTripEvent(
  userId,             // User ID
  tripId,             // Trip ID
  'Trip Updated',
  'Your trip details have been updated',
  organizationId      // Optional: Organization ID
);
```

#### Maintenance Notification

```typescript
// Send a maintenance-related notification
await this.notificationEvents.notifyMaintenanceEvent(
  userId,             // User ID
  busId,              // Bus ID
  maintenanceId,      // Maintenance ID
  'Maintenance Scheduled',
  'A maintenance has been scheduled for your bus',
  organizationId      // Optional: Organization ID
);
```

#### System Alert

```typescript
// Send a system alert
await this.notificationEvents.notifySystemAlert(
  userId,             // User ID
  'System Update',
  'The system will be under maintenance tonight',
  { priority: 'high' },  // Optional: additional data
  organizationId      // Optional: Organization ID
);
```

## Organizer Notification Features

The Organizer module provides additional capabilities for sending notifications to multiple users or role groups. See the `NotificationService` in the Organizer module for details.

## WebSocket Support

Clients can connect to the notification WebSocket to receive real-time notifications. See the `docs/notification-client-usage.md` file for client-side integration details.

## API Endpoints

### Organizer Notifications API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/organizer/notifications/send` | POST | Send notifications to specific users |
| `/organizer/notifications/send/role` | POST | Send notifications to users by role |
| `/organizer/notifications` | GET | Get all notifications for the current user |
| `/organizer/notifications/organization/:organizationId` | GET | Get all notifications for an organization |
| `/organizer/notifications/:id/read` | PATCH | Mark a notification as read |
| `/organizer/notifications/read-all` | PATCH | Mark all notifications as read for the current user |
| `/organizer/notifications/:id` | DELETE | Delete a notification |

### User Notifications API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/notifications` | GET | Get user notifications with pagination |
| `/notifications/:id` | GET | Get a specific notification |
| `/notifications/:id/read` | PATCH | Mark a notification as read |
| `/notifications/read-all` | PATCH | Mark all user notifications as read |
| `/notifications/:id` | DELETE | Delete a specific notification |
| `/notifications` | DELETE | Delete all user notifications | 