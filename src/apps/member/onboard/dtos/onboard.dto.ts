import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsMongoId,
  IsPhoneNumber,
  IsPostalCode,
  ArrayNotEmpty,
} from 'class-validator';

export class OnboardDto {
  @ApiProperty({
    description: 'The ID of the organization',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  organization: string;

  @ApiProperty({
    description: 'student image',
    example: '',
  })
  studentImage: string;

  @ApiProperty({
    description: 'Full name of the student',
    example: 'John Doe',
  })
  studentName: string;

  @ApiProperty({
    description: 'List of student disabilities',
    example: ['ADHD', 'Dyslexia'],
    required: false,
    type: [String],
  })
  studentDisabilities: string[];

  @ApiProperty({
    description: 'Student Social Security Number',
    example: '123-45-6789',
  })
  studentSsn: string;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main St',
  })
  street: string;

  @ApiProperty({
    description: 'City name',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'State name',
    example: 'NY',
  })
  state: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'Postal/ZIP code',
    example: '10001',
  })
  postalCode: string;

  // @ApiProperty({
  //   description: 'Member ID (optional)',
  //   required: false,
  //   example: '507f1f77bcf86cd799439011',
  // })
  // @IsMongoId()
  // @IsOptional()
  // member?: string;
}
