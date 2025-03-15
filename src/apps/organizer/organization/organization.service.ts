import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationDto } from './dtos/organization.dto';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { Address } from 'src/addresses/address.schema';
import { OrganizersService } from 'src/users/services/organizers.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly organizerService: OrganizersService,
  ) {}

  async create(
    request: Request,
    address: Address,
    organizationDto: any,
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
      ownerId: request['user']['organizer'],
    });

    return organization;
  }

  async findAll(request: Request, page: number = 1, limit: number = 10) {
    const organizer = request['user']['organizer'];
    if (!organizer) {
      return []; // Or throw an exception if an organizer is expected to exist
    }

    return this.organizationsService.findAll(page, limit, {
      owner: organizer._id,
    });
  }

  async findOne(request: Request, id: string) {
    const organizer = request['user']['organizer'];
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    // Fetch the organization by ID and ownerId
    const organization = await this.organizationsService.findOne({
      _id: id,
      owner: organizer._id,
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return organization;
  }

  async update(
    request: Request,
    id: string,
    organizationDto: OrganizationDto,
    file?: Express.Multer.File,
  ) {
    const organizer = request['user']['organizer'];
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    // Upload new image if provided
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await uploadFile(file, 'organizer');
    }
    // Prepare update data, merging DTO and new image URL
    const updateData = {
      ...organizationDto,
      ...(imageUrl && { image: imageUrl }),
    };

    // Update the organization only if it belongs to the organizer
    const updatedOrganization =
      await this.organizationsService.findOneAndUpdate(
        { _id: id, owner: organizer._id },
        updateData,
        { new: true }, // Return the updated document
      );

    if (!updatedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return updatedOrganization;
  }

  async remove(request: Request, id: string) {
    const organizer = request['user']['organizer'];
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    const deletedOrganization =
      await this.organizationsService.findOneAndDelete({
        _id: id,
        owner: organizer._id,
      });

    if (!deletedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return deletedOrganization;
  }
}
