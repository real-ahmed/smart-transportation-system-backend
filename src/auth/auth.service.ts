import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAuthProvider } from './providers/user-auth.provider';
import { EmployeeAuthProvider } from './providers/employee-auth.provider';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userAuthProvider: UserAuthProvider,
    private employeeAuthProvider: EmployeeAuthProvider,
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
  ): Promise<{ access_token: string }> {
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

      return {
        access_token: await this.jwtService.signAsync({ account }),
      };
    } catch (error) {
      if (error.message in this.ERROR_MESSAGES) {
        throw new UnauthorizedException(this.ERROR_MESSAGES[error.message]);
      }
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  async signUp(signUpDto: Record<string, any>, isEmployee = false) {
    const authProvider = isEmployee
      ? this.employeeAuthProvider
      : this.userAuthProvider;
    return authProvider.createAccount(signUpDto);
  }
}
