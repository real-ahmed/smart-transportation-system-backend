import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult, Types } from 'mongoose';
import { Organization, OrganizationDocument } from './organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
  ) {}

  // Create a new organization
  async create(createOrganizationDto: any): Promise<Organization> {
    const { name, type, image, description, addressId, ownerId } =
      createOrganizationDto;

    const newOrganization = new this.organizationModel({
      name,
      type,
      image,
      description,
      address: addressId,
      owner: ownerId,
    });

    return newOrganization.save();
  }

  // Find all organizations
  async findAll(filter?: any) {
    return this.organizationModel.find(filter).exec();
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
  ): Promise<OrganizationDocument | null> {
    const result: ModifyResult<OrganizationDocument> =
      await this.organizationModel
        .findOneAndUpdate(filter, update, { ...options, new: true })
        .exec();

    // Extract the document from the ModifyResult object
    if (result && result.value) {
      return result.value;
    }

    return null;
  }

  async findOneAndDelete(filter: any) {
    return this.organizationModel.findOneAndDelete(filter).exec();
  }
}
