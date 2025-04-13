import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationType } from './notification.schema';

@Injectable()
export class NotificationEventsService {
    constructor(private readonly notificationsService: NotificationsService) { }

    // User notifications
    async notifyUser(
        userId: string,
        title: string,
        message: string,
        type: NotificationType = NotificationType.INFO,
        data?: Record<string, any>,
    ) {
        return this.notificationsService.createUserNotification(
            userId,
            title,
            message,
            type,
            data,
        );
    }

    // Organization notifications
    async notifyOrganization(
        organizationId: string,
        userId: string,
        title: string,
        message: string,
        type: NotificationType = NotificationType.INFO,
        data?: Record<string, any>,
    ) {
        return this.notificationsService.createUserNotification(
            userId,
            title,
            message,
            type,
            data,
            organizationId,
        );
    }

    // Trip notifications
    async notifyTripEvent(
        userId: string,
        tripId: string,
        title: string,
        message: string,
        organizationId?: string,
    ) {
        return this.notificationsService.createUserNotification(
            userId,
            title,
            message,
            NotificationType.TRIP,
            { tripId },
            organizationId,
        );
    }

    // Bus maintenance notifications
    async notifyMaintenanceEvent(
        userId: string,
        busId: string,
        maintenanceId: string,
        title: string,
        message: string,
        organizationId?: string,
    ) {
        return this.notificationsService.createUserNotification(
            userId,
            title,
            message,
            NotificationType.MAINTENANCE,
            { busId, maintenanceId },
            organizationId,
        );
    }

    // System alerts
    async notifySystemAlert(
        userId: string,
        title: string,
        message: string,
        data?: Record<string, any>,
        organizationId?: string,
    ) {
        return this.notificationsService.createUserNotification(
            userId,
            title,
            message,
            NotificationType.ALERT,
            data,
            organizationId,
        );
    }
} 