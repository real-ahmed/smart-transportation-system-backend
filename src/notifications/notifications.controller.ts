import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    UseGuards,
    Patch,
    Request,
    NotFoundException,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new notification' })
    @ApiResponse({ status: 201, description: 'The notification has been successfully created.' })
    async create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all notifications for the current user' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'isRead', required: false, type: Boolean })
    async findAll(
        @Request() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('isRead') isRead?: boolean,
    ) {
        const userId = req.user.id;
        return this.notificationsService.getByUser(userId, page, limit, isRead);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a notification by ID' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param('id') id: string) {
        try {
            return await this.notificationsService.findById(id);
        } catch (error) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
    }

    @Patch(':id/read')
    @ApiOperation({ summary: 'Mark a notification as read' })
    @ApiParam({ name: 'id', type: String })
    async markAsRead(@Param('id') id: string) {
        try {
            return await this.notificationsService.markAsRead(id);
        } catch (error) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
    }

    @Patch('read-all')
    @ApiOperation({ summary: 'Mark all notifications as read for the current user' })
    async markAllAsRead(@Request() req) {
        const userId = req.user.id;
        await this.notificationsService.markAllAsRead(userId);
        return { success: true, message: 'All notifications marked as read' };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a notification' })
    @ApiParam({ name: 'id', type: String })
    async remove(@Param('id') id: string) {
        try {
            await this.notificationsService.delete(id);
            return { success: true, message: 'Notification deleted successfully' };
        } catch (error) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
    }

    @Delete()
    @ApiOperation({ summary: 'Delete all notifications for the current user' })
    async removeAll(@Request() req) {
        const userId = req.user.id;
        await this.notificationsService.deleteAllByUser(userId);
        return {
            success: true,
            message: 'All notifications deleted successfully',
        };
    }
} 