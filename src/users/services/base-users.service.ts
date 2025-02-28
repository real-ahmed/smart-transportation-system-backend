import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException, Injectable } from '@nestjs/common';
import { BaseUser } from '../schemas/base-user.schema';
import { hashSync } from 'bcryptjs';

@Injectable()
export abstract class BaseUsersService<T extends BaseUser> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    if (createDto.password) {
      createDto.password = hashSync(createDto.password);
    }
    const created = new this.model(createDto);
    return created.save();
  }

  async findById(id: string): Promise<T> {
    const user = await this.model.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    const updated = await this.model.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('User not found');
    }
    return updated;
  }

  async delete(id: string): Promise<T> {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return deleted;
  }
}
