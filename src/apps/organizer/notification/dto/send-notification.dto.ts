import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { NotificationType } from 'src/notifications/notification.schema';

export class SendNotificationDto {
    @ApiProperty({
        description: 'Array of user IDs to send notification to',
        type: [String],
    })
    @IsArray()
    @IsNotEmpty()
    userIds: string[];

    @ApiProperty({
        description: 'Notification title',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Notification message',
    })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiPropertyOptional({
        description: 'Notification type',
        enum: NotificationType,
        default: NotificationType.INFO,
    })
    @IsEnum(NotificationType)
    @IsOptional()
    type?: NotificationType;

    @ApiPropertyOptional({
        description: 'Additional data to include with the notification',
        type: Object,
    })
    @IsObject()
    @IsOptional()
    data?: Record<string, any>;
} 