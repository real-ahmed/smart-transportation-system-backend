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
export class BusDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    registrationPlate: string;

    @ApiProperty()
    @IsNotEmpty()
    capacity: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsMongoId()
    driver: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsMongoId()
    supervisor: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsMongoId()
    organizationId: string;

}