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
    address: any,
    onboardDto: any,
    file: Express.Multer.File,
  ) {
    // Upload image and get the URL
    const imageUrl = await uploadFile(file, 'organizer');
    const organizationDto = {
      ...onboardDto,
      owner: request['user']['_id'], // include the owner id
      address: address._id, // include the created address id
      image: imageUrl,
    };

    return this.organizationsService.create(organizationDto);
  }

  async findAll(request: Request, page: number = 1, limit: number = 10) {
    return this.organizationsService.findAll(page, limit, {
      owner: request['user']['id'],
    });
  }

  async findOne(request: Request, id: string) {
    // const organizer = request['user']['organizer'];
    // if (!organizer) {
    //   throw new NotFoundException('Organizer not found');
    // }

    // Fetch the organization by ID and ownerId
    const organization = await this.organizationsService.findOne({
      _id: id,
      owner: request['user']['id'],
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
    const organizer = request['user'];
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
        owner: request['user']['id'],
      });

    if (!deletedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return deletedOrganization;
  }
}
