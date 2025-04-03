import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Organizer } from '../schemas/organizer.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';
// import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectModel(Organizer.name) private organizerModel: Model<Organizer>,
    private readonly usersService: UsersService,
  ) {}

  // Create new organizer
  async create(userId: string): Promise<Organizer | null> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const createdOrganizer = new this.organizerModel({ user });
    await createdOrganizer.save();

    return createdOrganizer;
  }

  // Get all organizers
  async findAll(page: number = 1, limit: number = 10, filter = {}) {
    return getPaginatedResults(this.organizerModel, page, limit, filter);
  }

  // Get a specific organizer by ID
  async findOne(id: string): Promise<Organizer> {
    const organizer = await this.organizerModel.findById(id).exec();
    if (!organizer) {
      throw new NotFoundException(`Organizer with id ${id} not found`);
    }
    return organizer;
  }

  // Find an organizer by user ID
  async findByUser(userId: string | Types.ObjectId): Promise<Organizer | null> {
    const organizer = await this.organizerModel
      .findOne({
        user: new mongoose.Types.ObjectId(userId), // Convert here
      })
      .exec();

    return organizer;
  }

  // Update an existing organizer
  // async update(
  //   id: string,
  //   updateOrganizerDto: UpdateOrganizerDto,
  // ): Promise<Organizer> {
  //   const organizer = await this.organizerModel
  //     .findByIdAndUpdate(id, updateOrganizerDto, { new: true })
  //     .exec();

  //   if (!organizer) {
  //     throw new NotFoundException(`Organizer with id ${id} not found`);
  //   }

  //   return organizer;
  // }

  // Remove an organizer
  async remove(id: string): Promise<void> {
    const result = await this.organizerModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Organizer with id ${id} not found`);
    }
  }
}
