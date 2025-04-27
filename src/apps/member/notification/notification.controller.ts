import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Member Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for the current member' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean })
  findAll(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('isRead') isRead?: boolean,
  ) {
    return this.notificationService.findAll(req, page, limit, isRead);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.notificationService.findOne(req, id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  markAsRead(@Request() req, @Param('id') id: string) {
    return this.notificationService.markAsRead(req, id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllAsRead(@Request() req) {
    return this.notificationService.markAllAsRead(req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  remove(@Request() req, @Param('id') id: string) {
    return this.notificationService.remove(req, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all notifications for the current member' })
  removeAll(@Request() req) {
    return this.notificationService.removeAll(req);
  }
}
