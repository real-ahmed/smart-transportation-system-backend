import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { UserStatus } from '../../users/schemas/user.schema';

export class SignUpDto {
  @ApiProperty({ example: 'Ahmed', type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Emad', type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'ahmed@example.com', type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+201017078859', type: String })
  @IsNotEmpty()
  @IsPhoneNumber(undefined)
  phoneNumber: string;

  @ApiProperty({ example: 'password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'active',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}
