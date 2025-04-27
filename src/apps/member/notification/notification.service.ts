import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Request } from 'express';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async findAll(req: Request, page = 1, limit = 10, isRead?: boolean) {
    const userId = req['user']['_id'];
    return this.notificationsService.getByUser(userId, page, limit, isRead);
  }

  async findOne(req: Request, id: string) {
    const notification = await this.notificationsService.findById(id);
    if (notification.userId.toString() !== req['user']['_id']) {
      throw new Error('Unauthorized access to notification');
    }
    return notification;
  }

  async markAsRead(req: Request, id: string) {
    return this.notificationsService.markAsRead(id);
  }

  async markAllAsRead(req: Request) {
    const userId = req['user']['_id'];
    return this.notificationsService.markAllAsRead(userId);
  }

  async remove(req: Request, id: string) {
    return this.notificationsService.delete(id);
  }

  async removeAll(req: Request) {
    const userId = req['user']['_id'];
    return this.notificationsService.deleteAllByUser(userId);
  }
}
