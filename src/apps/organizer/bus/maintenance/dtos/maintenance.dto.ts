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


}