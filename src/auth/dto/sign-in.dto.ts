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
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => !o.identifier || !o.identifier.includes('@')) // Check if it's not an email
  @IsPhoneNumber(undefined, {
    message: 'identifier must be a valid phone number',
  })
  @ValidateIf((o) => !o.identifier || o.identifier.includes('@')) // Check if it's an email
  @IsEmail({}, { message: 'identifier must be a valid email address' })
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsUUID('4', { message: 'organization must be a valid UUID' })
  organization: string;
}
