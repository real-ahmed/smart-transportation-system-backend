import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateAddressDto } from 'src/addresses/dtos/create-address.dto';
import { UpdateAddressDto } from 'src/addresses/dtos/update-address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Req() request, @Body() dto: CreateAddressDto) {
    return this.addressService.create(request, dto);
  }

  @Get()
  async findAll(@Req() request) {
    return this.addressService.findAll(request);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.update(request, id, dto);
  }

  @Delete(':id')
  async delete(@Req() request, @Param('id') id: string) {
    return this.addressService.delete(request, id);
  }
}
