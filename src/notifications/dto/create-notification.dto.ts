import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '../notification.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({
        description: 'The title of the notification',
        example: 'Bus Schedule Change',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The message content of the notification',
        example: 'The bus schedule has been updated due to weather conditions',
    })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({
        description: 'The type of notification',
        enum: NotificationType,
        example: NotificationType.INFO,
    })
    @IsEnum(NotificationType)
    @IsOptional()
    type?: NotificationType;

    @ApiProperty({
        description: 'The recipient user ID',
        example: '60d0fe4f5311236168a109cb',
    })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'The organization ID',
        example: '60d0fe4f5311236168a109cd',
        required: false,
    })
    @IsString()
    @IsOptional()
    organizationId?: string;

    @ApiProperty({
        description: 'Additional data for the notification',
        example: { tripId: '60d0fe4f5311236168a109ce' },
        required: false,
    })
    @IsObject()
    @IsOptional()
    data?: Record<string, any>;
} 