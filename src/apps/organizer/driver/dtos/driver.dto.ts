import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsPostalCode,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DriverDto {}
