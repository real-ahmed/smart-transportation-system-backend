import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async markAsRead(request: Request, notificationId: string) {
    // First check if the notification belongs to this user
    const notification =
      await this.notificationsService.findById(notificationId);

    if (notification.userId.toString() !== request['user']['_id']) {
      throw new Error('Unauthorized access to notification');
    }

    return this.notificationsService.markAsRead(notificationId);
  }

  async markAllAsRead(request: Request) {
    const userId = request['user']['_id'];
    return this.notificationsService.markAllAsRead(userId);
  }

  findAll(request: Request, page?: number, limit?: number) {
    const supervisorId = request['user']['_id'];
    return this.notificationsService.findAll(page, limit, {
      userId: supervisorId,
    });
  }
}
