import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { BaseUsersService } from './base-users.service';

@Injectable()
export class UsersService extends BaseUsersService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.userModel
      .findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      })
      .exec();
  }
}
