import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification, NotificationSchema } from './notification.schema';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationEventsService } from './notification-events.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notification.name, schema: NotificationSchema },
        ]),
        AuthModule,
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService, NotificationsGateway, NotificationEventsService],
    exports: [NotificationsService, NotificationEventsService],
})
export class NotificationsModule implements OnModuleInit {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly notificationsGateway: NotificationsGateway,
    ) { }

    onModuleInit() {
        // Override the emitNotificationEvent method to use the gateway
        this.notificationsService.emitNotificationEvent = this.emitNotificationEvent.bind(this);
    }

    private emitNotificationEvent(notification: Notification): void {
        // Send notification to specific user
        this.notificationsGateway.sendToUser(notification.userId, notification);

        // If there's an organization ID, send to the organization as well
        if (notification.organizationId) {
            this.notificationsGateway.sendToOrganization(notification.organizationId, notification);
        }
    }
} 