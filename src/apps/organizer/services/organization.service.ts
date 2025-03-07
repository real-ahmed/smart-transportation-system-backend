import { Injectable } from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { Address } from 'src/addresses/address.schema';

@Injectable()
export class OrganizationService {
  constructor(private readonly organizationsService: OrganizationsService) {}

  async create(
    organizer: any,
    address: Address,
    organizationDto: OrganizationDto,
    file: Express.Multer.File,
  ) {
    // Upload image and get the URL
    const imageUrl = await uploadFile(file, 'organizer');
    organizationDto.image = imageUrl;

    // Create organization with the addressId
    const organization = await this.organizationsService.create({
      name: organizationDto.name,
      type: organizationDto.type,
      image: organizationDto.image,
      description: organizationDto.description,
      addressId: address._id,
      ownerId: organizer._id,
    });

    return organization;
  }
}
