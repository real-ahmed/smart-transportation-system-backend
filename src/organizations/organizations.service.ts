import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult, Types } from 'mongoose';
import { Organization, OrganizationDocument } from './organization.schema';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
  ) {}

  // Create a new organization
  async create(createOrganizationDto: any): Promise<Organization> {
    const newOrganization = await this.organizationModel.create(
      createOrganizationDto,
    );

    // Populate owner data if the organization has an owner field
    const populatedOrganization = await this.organizationModel
      .findById(newOrganization['_id'])
      .populate('owner')
      .exec();

    return populatedOrganization as OrganizationDocument;

  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}) {
    return getPaginatedResults(this.organizationModel, page, limit, filter);
  }

  // Find an organization by its ID
  async findById(id: string): Promise<Organization> {
    const organization = await this.organizationModel
      .findById(id)
      .populate('address')
      .exec();
    if (!organization) {
      throw new Error('Organization not found');
    }
    return organization;
  }

  // Update an organization by its ID
  async update(id: string, updateOrganizationDto: any): Promise<Organization> {
    const updatedOrganization = await this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .populate('address')
      .exec();

    if (!updatedOrganization) {
      throw new Error('Organization not found');
    }
    return updatedOrganization;
  }

  // Delete an organization by its ID
  async remove(id: string): Promise<Organization> {
    const deletedOrganization = await this.organizationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedOrganization) {
      throw new Error('Organization not found');
    }
    return deletedOrganization;
  }

  async findOne(filter: any) {
    return this.organizationModel.findOne(filter).exec();
  }
  async findOneAndUpdate(
    filter: any,
    update: any,
    options?: any,
  ): Promise<ModifyResult<OrganizationDocument> | null> {
    return this.organizationModel
      .findOneAndUpdate(filter, update, options)
      .exec();
  }

  async findOneAndDelete(filter: any) {
    return this.organizationModel.findOneAndDelete(filter).exec();
  }
}
