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

export class OrganizationDto {
  @ApiProperty({
    description: 'The name of the organization',
    example: 'al-salahat school',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the organization, e.g., school.',
    example: 'school',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description:
      'Phone number of the organization in international format, e.g., +2348012345678',
    example: '01017078859',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'A brief description of the organization',
    example: 'any description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Image file to upload ',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @Type(() => String)
  image: any;

  @ApiProperty({
    description: 'address id',
    example: '67c18d60463df10605f7f1fd',
  })
  @IsString()
  @IsNotEmpty()
  addressId: string;

  // @ApiProperty({
  //   description: 'Street address of the organization',
  //   example: '123 Main Street',
  // })
  // @IsString()
  // @IsNotEmpty()
  // street: string;

  // @ApiProperty({
  //   description: 'City where the organization is located',
  //   example: 'mansoura',
  // })
  // @IsString()
  // @IsNotEmpty()
  // city: string;

  // @ApiProperty({
  //   description: 'State or province where the organization is located',
  //   example: 'Dakahlia',
  // })
  // @IsString()
  // @IsNotEmpty()
  // state: string;

  // @ApiProperty({
  //   description: "Postal code for the organization's location",
  //   example: '94105',
  // })
  // @IsPostalCode('any')
  // @IsNotEmpty()
  // postalCode: string;
}
