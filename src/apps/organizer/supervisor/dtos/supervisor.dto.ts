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

export class SupervisorDto {
  @ApiProperty({
    description: 'Image file to upload ',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @Type(() => String)
  image: any;

  @ApiProperty({ example: 'Supervisor', type: String })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Name', type: String })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'supervisor@example.com', type: String })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ example: '+20123456789', type: String })
  @IsNotEmpty()

  phoneNumber: string;

  @ApiProperty({ example: 'Supervisor@123', type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain uppercase, lowercase, number/special character',
  })
  password: string;


  @ApiProperty({
    description: 'Reference to the organization ID',
    example: '67d41007e56dd095270d2ee8',
  })
  @IsMongoId()
  @IsNotEmpty()
  organization: string;
}
