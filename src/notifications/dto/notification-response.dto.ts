import { NotificationType } from '../notification.schema';

export class NotificationResponseDto {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    userId: string;
    organizationId?: string;
    isRead: boolean;
    data?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
} 