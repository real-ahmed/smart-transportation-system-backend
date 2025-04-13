import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsPostalCode,
    IsDateString,
    MinLength,
    MaxLength,
    IsEmail,
    Matches,
    IsDate,
    IsMongoId,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
export class MaintenanceDto {
    @ApiProperty({
        description: 'The title of the maintenance',
        example: 'Engine Checkup',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Description of the maintenance',
        example: 'Regular engine maintenance and oil change',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'The scheduled date for maintenance',
        example: '2023-10-15T10:00:00.000Z',
    })
    @IsDateString()
    scheduledDate: string;

    @ApiProperty({
        description: 'Status of the maintenance',
        example: 'scheduled',
    })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({
        description: 'The ID of the bus',
        example: '60d0fe4f5311236168a109ca',
    })
    @IsMongoId()
    @IsNotEmpty()
    busId: string;

    @ApiProperty({
        description: 'The ID of the user responsible for maintenance',
        example: '60d0fe4f5311236168a109cb',
    })
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'The ID of the organization',
        example: '60d0fe4f5311236168a109cc',
    })
    @IsMongoId()
    @IsOptional()
    organizationId?: string;
}