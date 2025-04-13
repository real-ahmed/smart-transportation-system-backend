import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { OrganizerGuard } from '../common/guards/organizer.guard';
import { OrganizationAccessGuard } from '../common/guards/organization-access.guard';
import { SendNotificationDto } from './dto/send-notification.dto';


@ApiTags('organizer/notifications')
@Controller('notifications')
@UseGuards(OrganizerGuard, OrganizationAccessGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('send')
    @ApiOperation({ summary: 'Send a notification to a user or multiple users' })
    async sendNotification(
        @Body() sendNotificationDto: SendNotificationDto,
        @Query('organizationId') organizationId: string,
    ) {
        return this.notificationService.sendNotification(sendNotificationDto, organizationId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all notifications for the organization' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getOrganizationNotifications(
        @Query('organizationId') organizationId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.notificationService.getOrganizationNotifications(organizationId, page, limit);
    }

    @Get('unread')
    @ApiOperation({ summary: 'Get unread notifications for the current user' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getUnreadNotifications(
        @Query('userId') userId: string,
        @Query('organizationId') organizationId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.notificationService.getUserNotifications(userId, organizationId, page, limit, false);
    }

    @Get('user')
    @ApiOperation({ summary: 'Get all notifications for the current user' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getUserNotifications(
        @Query('userId') userId: string,
        @Query('organizationId') organizationId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.notificationService.getUserNotifications(userId, organizationId, page, limit);
    }

    @Patch(':id/read')
    @ApiOperation({ summary: 'Mark a notification as read' })
    @ApiParam({ name: 'id', description: 'Notification ID' })
    async markAsRead(
        @Param('id') id: string,
        @Query('userId') userId: string,
    ) {
        return this.notificationService.markAsRead(id, userId);
    }

    @Patch('read-all')
    @ApiOperation({ summary: 'Mark all notifications as read for current user' })
    async markAllAsRead(
        @Query('userId') userId: string,
        @Query('organizationId') organizationId: string,
    ) {
        return this.notificationService.markAllAsRead(userId, organizationId);
    }
} 