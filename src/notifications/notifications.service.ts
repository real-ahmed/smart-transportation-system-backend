import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './notification.schema';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: Model<NotificationDocument>,
    ) { }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const newNotification = new this.notificationModel(createNotificationDto);
        const savedNotification = await newNotification.save();

        // Emit notification event - this will be handled in the module where we inject the gateway
        this.emitNotificationEvent(savedNotification);

        return savedNotification;
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        filter: any = {},
    ) {
        return getPaginatedResults(this.notificationModel, page, limit, filter);
    }

    async findById(id: string): Promise<Notification> {
        const notification = await this.notificationModel.findById(id).exec();
        if (!notification) {
            throw new Error('Notification not found');
        }
        return notification;
    }

    async getByUser(userId: string, page: number = 1, limit: number = 10, isRead?: boolean) {
        const filter: any = { userId };

        if (isRead !== undefined) {
            filter.isRead = isRead;
        }

        return this.findAll(page, limit, filter);
    }

    async getByOrganization(organizationId: string, page: number = 1, limit: number = 10) {
        return this.findAll(page, limit, { organizationId });
    }

    async markAsRead(id: string): Promise<Notification> {
        const notification = await this.notificationModel
            .findByIdAndUpdate(id, { isRead: true }, { new: true })
            .exec();

        if (!notification) {
            throw new Error('Notification not found');
        }

        return notification;
    }

    async markAllAsRead(userId: string): Promise<void> {
        await this.notificationModel.updateMany(
            { userId, isRead: false },
            { isRead: true }
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.notificationModel.findByIdAndDelete(id).exec();
    }

    async deleteAllByUser(userId: string): Promise<void> {
        await this.notificationModel.deleteMany({ userId }).exec();
    }

    // This method will be called from external services to create notifications
    async createUserNotification(
        userId: string,
        title: string,
        message: string,
        type: NotificationType = NotificationType.INFO,
        data?: Record<string, any>,
        organizationId?: string,
    ): Promise<Notification> {
        const notification: CreateNotificationDto = {
            userId,
            title,
            message,
            type,
            data,
            organizationId,
        };

        return this.create(notification);
    }

    // This method is to be called by the NotificationsModule where we have access to the gateway
    emitNotificationEvent(notification: Notification): void {
        // This is an empty method that will be overridden in the NotificationsModule
        // where we'll have access to the NotificationsGateway
    }
} 