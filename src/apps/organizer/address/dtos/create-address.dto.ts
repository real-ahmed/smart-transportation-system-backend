import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  street: string;

  @ApiProperty({ example: 'Cairo', description: 'City name' })
  city: string;

  @ApiProperty({ example: 'Cairo Governorate', description: 'State or region' })
  state: string;

  @ApiProperty({ example: '+201234567890', description: 'Phone number' })
  phoneNumber: string;

  @ApiProperty({ example: '12345', description: 'Postal code' })
  postalCode: string;
}
