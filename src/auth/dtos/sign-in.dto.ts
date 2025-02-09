import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'ahmed@example.com', type: String })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => !o.identifier || !o.identifier.includes('@')) // Check if it's not an email
  @IsPhoneNumber(undefined, {
    message: 'identifier must be a valid phone number',
  })
  @ValidateIf((o) => !o.identifier || o.identifier.includes('@')) // Check if it's an email
  @IsEmail({}, { message: 'identifier must be a valid email address' })
  identifier: string;

  @ApiProperty({ example: 'password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'sd554', type: String, required: false })
  @IsOptional()
  organization: string;
}
