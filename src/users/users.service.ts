import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: any): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.userModel
      .findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      })
      .exec();
  }
}
