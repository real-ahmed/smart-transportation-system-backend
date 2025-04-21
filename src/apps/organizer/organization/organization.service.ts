import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationDto } from './dtos/organization.dto';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { Address } from 'src/addresses/address.schema';
import { OrganizersService } from 'src/users/services/organizers.service';
import { Types } from 'mongoose';

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

    // Ensure you use the correct property from user
    const ownerId = request['user']['_id'] || request['user']['id'];
    if (!ownerId) {
      throw new Error('User id is missing from request.');
    }

    // Ensure address has _id
    if (!address || !address._id) {
      throw new Error('Address creation failed or returned invalid data.');
    }

    const organizationDto = {
      ...onboardDto,
      owner: new Types.ObjectId(ownerId), // include the owner id
      address: new Types.ObjectId(address._id), // include the created address id
      image: imageUrl,
    };

    console.log('Creating organization with DTO:', organizationDto);
    return this.organizationsService.create(organizationDto);
  }

  async findAll(request: Request, page: number = 1, limit: number = 10) {
    console.log(request['user']['_id']);
    return this.organizationsService.findAll(page, limit, {
      owner: new Types.ObjectId(request['user']['_id']),
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
      owner: new Types.ObjectId(request['user']['_id']),
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
        { _id: id, owner: new Types.ObjectId(request['user']['_id']) },
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
        owner: new Types.ObjectId(request['user']['_id']),
      });

    if (!deletedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return deletedOrganization;
  }
}
