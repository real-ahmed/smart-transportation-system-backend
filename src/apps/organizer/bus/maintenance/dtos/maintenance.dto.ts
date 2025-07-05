import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsMongoId,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum MaintenanceStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

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
    enum: MaintenanceStatus,
    default: MaintenanceStatus.SCHEDULED,
  })
  @IsOptional()
  @IsEnum(MaintenanceStatus)
  status?: MaintenanceStatus;

  @ApiProperty({
    description: 'The ID of the bus',
    example: '60d0fe4f5311236168a109ca',
  })
  @IsMongoId()
  @IsNotEmpty()
  busId: string;

  @ApiProperty({
    description: 'The actual date when maintenance was performed',
    example: '2023-10-15T10:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  actualDate?: string;

  @ApiProperty({
    description: 'The ID of the organization',
    example: '60d0fe4f5311236168a109cb',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  organizationId?: string;

  @ApiProperty({
    description: 'Cost of the maintenance',
    example: 150.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty({
    description: 'Notes about the maintenance',
    example: 'Maintenance completed successfully',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
