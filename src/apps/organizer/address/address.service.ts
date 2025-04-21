import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateAddressDto } from 'src/addresses/dtos/create-address.dto';
import { UpdateAddressDto } from 'src/addresses/dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressesService: AddressesService) {}

  delete(request: Request, id: string) {
    const address = this.addressesService.findOne(id);
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    if (request['user']['_id'] !== address['owner']) {
      throw new ForbiddenException(
        'You do not have permission to delete this address',
      );
    }
    return this.addressesService.delete(id);
  }

  async update(request: Request, id: string, dto: UpdateAddressDto) {
    const address = await this.addressesService.findOne(id);
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    if (request['user']['_id'] !== address['owner']) {
      throw new ForbiddenException(
        'You do not have permission to update this address',
      );
    }
    return this.addressesService.update(id, dto);
  }

  async findOne(id: string) {
    const address = await this.addressesService.findOne(id);
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return address;
  }

  async findAll(request :Request) {
    return this.addressesService.findAll({owner: request['user']['_id']});
  }

  async create(request: Request, dto: CreateAddressDto) {
    const owner = request['user']['_id'];
    dto['owner'] = owner;
    return this.addressesService.create({ ...dto });
  }
}
