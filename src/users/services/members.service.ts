import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Organizer } from '../schemas/organizer.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';
// import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { Member } from '../schemas/member.schema';


@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    private readonly usersService: UsersService,
  ) { }

  // Create new organizer
  async create(userId: string): Promise<Member | null> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const createdMember = new this.memberModel({ user });
    await createdMember.save();

    return createdMember;
  }

  // Get all organizers
  async findAll(page: number = 1, limit: number = 10, filter = {}) {
    return getPaginatedResults(this.memberModel, page, limit, filter);
  }

  // Get a specific organizer by ID
  async findOne(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return member;
  }

  // Find an organizer by user ID
  async findByUser(userId: string | Types.ObjectId): Promise<Member | null> {
    const member = await this.memberModel
      .findOne({
        user: new mongoose.Types.ObjectId(userId), // Convert here
      })
      .exec();

    return member;
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
    const result = await this.memberModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
  }

  async subscribeToOrganization(memberId: string, organizationId: string): Promise<Member> {
    const member = await this.findOne(memberId);
    if (!member) {
      throw new NotFoundException(`Member with id ${memberId} not found`);
    }
    // Assuming member has a field 'organizations' which is an array of organization IDs
    if (!member.organizations.includes(new mongoose.Types.ObjectId(organizationId))) {
      member.organizations.push(new mongoose.Types.ObjectId(organizationId));
      await this.memberModel.findByIdAndUpdate(memberId, member).exec();
    }
    return member;
  }

  async unsubscribeFromOrganization(memberId: string, organizationId: string): Promise<Member> {
    const member = await this.findOne(memberId);
    if (!member) {
      throw new NotFoundException(`Member with id ${memberId} not found`);
    }
    // Assuming member has a field 'organizations' which is an array of organization IDs
    const index = member.organizations.indexOf(new mongoose.Types.ObjectId(organizationId));
    if (index > -1) {
      member.organizations.splice(index, 1);
      await this.memberModel.findByIdAndUpdate(memberId, member).exec();
    }
    return member;
  }
}
