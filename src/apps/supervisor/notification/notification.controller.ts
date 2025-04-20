import { Controller, Get, Param, Patch, Put, Query, Req } from '@nestjs/common';
import { BaseSupervisorController } from '../base-supervisor.controller';
import { NotificationService } from './notification.service';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Supervisor Notifications')
@Controller('notification')
export class NotificationController extends BaseSupervisorController {
  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications for current supervisor' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({ status: 200, description: 'Returns list of notifications' })
  async getNotifications(
    @Req() request: Request,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.notificationService.findAll(request, page, limit);
  }

  @Put(':id/mark-read')
  @ApiOperation({ summary: 'Mark a specific notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(@Req() request, @Param('id') id: string) {
    return this.notificationService.markAsRead(request, id);
  }

  @Patch('read-all')
  @ApiOperation({
    summary: 'Mark all notifications as read for current supervisor',
  })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@Req() request) {
    return this.notificationService.markAllAsRead(request);
  }
}
