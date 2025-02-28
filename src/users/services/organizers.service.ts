import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Organizer } from '../schemas/organizer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectModel(Organizer.name) private organizerModel: Model<Organizer>,
    private readonly usersService: UsersService,
  ) {}

  async createOrganizer(userId: string): Promise<Organizer | null> {
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
}
