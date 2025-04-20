import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    markAsRead(id: string) {
        throw new Error('Method not implemented.');
    }
    markAllAsRead() {
        throw new Error('Method not implemented.');
    }
    getUnreadCount(supervisorId: any) {
        throw new Error('Method not implemented.');
    }
    findAll(supervisorId: any) {
        throw new Error('Method not implemented.');
    }
}
