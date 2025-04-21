import { Injectable, NotFoundException } from '@nestjs/common';
import { Address, AddressDocument } from './address.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name)
    private readonly model: Model<AddressDocument>,
  ) {}

  async create(data: CreateAddressDto): Promise<Address> {
    return this.model.create(data);
  }

  async findAll(filter): Promise<Address[]> {
    return this.model.find(filter).exec();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.model.findById(id).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address> {
    const updatedAddress = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!updatedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return updatedAddress;
  }

  async delete(id: string): Promise<Address> {
    const deletedAddress = await this.model.findByIdAndDelete(id).exec();
    if (!deletedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return deletedAddress;
  }
}
