import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.schema';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private userSocketMap: Map<string, string[]> = new Map();
    private organizationSocketMap: Map<string, string[]> = new Map();

    constructor(private readonly notificationsService: NotificationsService) { }

    handleConnection(client: Socket): void {
        const { userId, organizationId } = client.handshake.query;

        if (userId) {
            const userIdStr = userId.toString();
            const existingSockets = this.userSocketMap.get(userIdStr) || [];
            this.userSocketMap.set(userIdStr, [...existingSockets, client.id]);

            // Join user to their own room
            client.join(`user:${userIdStr}`);
        }

        if (organizationId) {
            const orgIdStr = organizationId.toString();
            const existingSockets = this.organizationSocketMap.get(orgIdStr) || [];
            this.organizationSocketMap.set(orgIdStr, [...existingSockets, client.id]);

            // Join organization room
            client.join(`organization:${orgIdStr}`);
        }
    }

    handleDisconnect(client: Socket): void {
        const { userId, organizationId } = client.handshake.query;

        if (userId) {
            const userIdStr = userId.toString();
            const existingSockets = this.userSocketMap.get(userIdStr) || [];
            this.userSocketMap.set(
                userIdStr,
                existingSockets.filter((socketId) => socketId !== client.id),
            );

            // Leave user room
            client.leave(`user:${userIdStr}`);
        }

        if (organizationId) {
            const orgIdStr = organizationId.toString();
            const existingSockets = this.organizationSocketMap.get(orgIdStr) || [];
            this.organizationSocketMap.set(
                orgIdStr,
                existingSockets.filter((socketId) => socketId !== client.id),
            );

            // Leave organization room
            client.leave(`organization:${orgIdStr}`);
        }
    }

    sendToUser(userId: string, notification: Notification): void {
        this.server.to(`user:${userId}`).emit('notification', notification);
    }

    sendToOrganization(organizationId: string, notification: Notification): void {
        this.server.to(`organization:${organizationId}`).emit('notification', notification);
    }

    sendToAll(notification: Notification): void {
        this.server.emit('notification', notification);
    }
} 