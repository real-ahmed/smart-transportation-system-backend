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

export class TripDto {
  @ApiProperty({ example: '2024-01-20', type: Date })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: '2024-01-20T08:00:00.000Z', type: Date })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2024-01-20T15:00:00.000Z', type: Date })
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    description: 'Reference to the bus ID',
    example: '67d41007e56dd095270d2ee8'
  })
  @IsMongoId()
  @IsNotEmpty()
  bus: string;

  @ApiProperty({
    description: 'Reference to the driver ID',
    example: '67d41007e56dd095270d2ee8'
  })
  @IsMongoId()
  @IsNotEmpty()
  driver: string;

  @ApiProperty({
    description: 'Reference to the supervisor ID',
    example: '67d41007e56dd095270d2ee8'
  })
  @IsMongoId()
  @IsNotEmpty()
  supervisor: string;

  @ApiProperty({
    description: 'Array of student IDs',
    example: ['67d41007e56dd095270d2ee8']
  })
  @IsMongoId({ each: true })
  @IsNotEmpty()
  students: string[];

  @ApiProperty({
    description: 'Reference to the organization ID',
    example: '67d41007e56dd095270d2ee8'
  })
  @IsMongoId()
  @IsNotEmpty()
  organization: string;

}
