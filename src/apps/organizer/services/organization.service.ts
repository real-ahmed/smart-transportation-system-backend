import { Injectable } from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { AddressesService } from 'src/addresses/addresses.service';
import { request } from 'http';
import { UsersService } from 'src/users/services/users.service';
import { Organizer } from 'src/users/schemas/organizer.schema';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    organizer: any,
    onboardDto: OrganizationDto,
    file: Express.Multer.File,
  ) {
    // Create address
    const address = await this.addressesService.create({
      street: onboardDto.street,
      city: onboardDto.city,
      state: onboardDto.state,
      phoneNumber: onboardDto.phoneNumber,
      postalCode: onboardDto.postalCode,
    });

    // Upload image and get the URL
    const imageUrl = await uploadFile(file, 'organizer');
    onboardDto.image = imageUrl;

    // Create organization with the addressId
    const organization = await this.organizationsService.create({
      name: onboardDto.name,
      type: onboardDto.type,
      image: onboardDto.image,
      description: onboardDto.description,
      addressId: address._id,
      ownerId: organizer._id,
    });

    return organization; // You can return the organization if needed
  }
}
