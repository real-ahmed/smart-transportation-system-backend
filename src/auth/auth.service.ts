import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAuthProvider } from './providers/user-auth.provider';
import { EmployeeAuthProvider } from './providers/employee-auth.provider';
import { OrganizersService } from 'src/users/services/organizers.service';
import { stringify } from 'querystring';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userAuthProvider: UserAuthProvider,
    private employeeAuthProvider: EmployeeAuthProvider,
    private organizersService: OrganizersService,
  ) {}

  private readonly ERROR_MESSAGES = {
    EMPLOYEE_NOT_FOUND: 'Employee account not found',
    USER_NOT_FOUND: 'User account not found',
    INVALID_PASSWORD: 'Invalid credentials',
    INVALID_STATUS: 'Account is not active',
  };

  async signIn(
    identifier: string,
    password: string,
    organization?: string,
  ): Promise<{ access_token: string; account_type: string }> {
    try {
      const authProvider = organization
        ? this.employeeAuthProvider
        : this.userAuthProvider;

      const account = await authProvider.findAccount(identifier, organization);
      if (!account || !authProvider.validateStatus(account)) {
        throw new Error(organization ? 'EMPLOYEE_NOT_FOUND' : 'USER_NOT_FOUND');
      }

      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        throw new Error('INVALID_PASSWORD');
      }

      let accountType = await authProvider.getAccountType(account);

      return {
        access_token: await this.jwtService.signAsync({
          _id: account['_id'],
          firstName: account['firstName'],
          lastName: account['lastName'],
          email: account['email'],
          phone: account['phoneNumber'],
          status: account['status'],
        }),
        account_type: accountType,
      };
    } catch (error) {
      if (error.message in this.ERROR_MESSAGES) {
        throw new UnauthorizedException(this.ERROR_MESSAGES[error.message]);
      }
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  async signUp(
    signUpDto: Record<string, any>,
    file: Express.Multer.File,
    isEmployee = false,
  ) {
    const authProvider = isEmployee
      ? this.employeeAuthProvider
      : this.userAuthProvider;
    return authProvider.createAccount(signUpDto, file);
  }
}
