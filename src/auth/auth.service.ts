import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  Employee,
  EmployeeDocument,
} from '../employees/schemas/employee.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Employee.name) private EmployeeModel: Model<EmployeeDocument>,
  ) {}

  async signIn(
    identifier: string,
    password: string,
    organization?: string,
  ): Promise<{ access_token: string }> {
    try {
      let account: any = null;
      let accountType = 'user';
      if (organization) {
        account = await this.EmployeeModel.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
          organization,
        })
          .select('+password')
          .populate(['driver', 'supervisor']);

        if (!account) {
          throw new Error('EMPLOYEE_NOT_FOUND');
        }
        accountType = 'employee';
      } else {
        account = await this.userModel
          .findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }],
          })
          .select('+password')
          .populate(['admin', 'member', 'organizer']);

        if (!account) {
          throw new Error('USER_NOT_FOUND');
        }
      }

      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        throw new Error('INVALID_PASSWORD');
      }

      const payload = {
        sub: account._id,
        accountType,
        organization: account.organization || null,
        role: account.role || 'user',
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (
        error.message === 'EMPLOYEE_NOT_FOUND' ||
        error.message === 'USER_NOT_FOUND'
      ) {
        throw new UnauthorizedException('Account not found');
      }
      if (error.message === 'INVALID_PASSWORD') {
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log(error);
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  async signUp(signUpDto: Record<string, any>): Promise<User> {
    return this.usersService.create(signUpDto);
  }
}
