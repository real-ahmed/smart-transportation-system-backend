import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType, Notification } from 'src/notifications/notification.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationsService: NotificationsService) { }

    async sendNotification(sendNotificationDto: SendNotificationDto, organizationId: string) {
        const { userIds, title, message, type, data } = sendNotificationDto;

        const notifications: Notification[] = [];

        // Send notification to each specified user
        for (const userId of userIds) {
            const notification = await this.notificationsService.createUserNotification(
                userId,
                title,
                message,
                type || NotificationType.INFO,
                data,
                organizationId,
            );
            notifications.push(notification);
        }

        return {
            success: true,
            count: notifications.length,
            notifications,
        };
    }

    async getUserNotifications(
        userId: string,
        organizationId: string,
        page = 1,
        limit = 10,
        isRead?: boolean
    ) {
        const filter: any = { userId, organizationId };

        if (isRead !== undefined) {
            filter.isRead = isRead;
        }

        return this.notificationsService.findAll(page, limit, filter);
    }

    async getOrganizationNotifications(organizationId: string, page = 1, limit = 10) {
        return this.notificationsService.findAll(page, limit, { organizationId });
    }

    async markAsRead(notificationId: string, userId: string) {
        // First check if the notification belongs to this user
        const notification = await this.notificationsService.findById(notificationId);

        if (notification.userId.toString() !== userId) {
            throw new Error('Unauthorized access to notification');
        }

        return this.notificationsService.markAsRead(notificationId);
    }

    async markAllAsRead(userId: string, organizationId: string) {
        // Find all notifications for this user and organization
        const result = await this.notificationsService.findAll(1, 9999, {
            userId,
            organizationId,
            isRead: false
        });

        // Mark each as read
        for (const notification of result.results) {
            await this.notificationsService.markAsRead(notification._id);
        }

        return {
            success: true,
            count: result.results.length,
        };
    }
}
