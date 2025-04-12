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
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class StudentDto {
  @ApiProperty({
    description: 'Image file to upload ',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @Type(() => String)
  image: any;

  @ApiProperty({ example: 'John', type: String })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: ['Disability 1', 'Disability 2'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  disabilities: string[];

  @ApiProperty({ example: '1234567890', type: String })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  ssn: string;

  @ApiProperty({ example: '67d41007e56dd095270d2ee8', type: String })
  @IsMongoId()
  @IsNotEmpty()
  organizationId: string;


  @ApiProperty({ example: '67d41007e56dd095270d2ee8', type: String })
  @IsMongoId()
  @IsNotEmpty()
  guardianId: string;

  @ApiProperty({ example: ['67d41007e56dd095270d2ee8', '67d41007e56dd095270d2ee8'], type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  followers: string[];


}
