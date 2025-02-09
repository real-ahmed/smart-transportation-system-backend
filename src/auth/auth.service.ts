import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import { UserStatus } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private employeesService: EmployeesService,
  ) {}

  async signIn(
    identifier: string,
    password: string,
    organization?: string,
  ): Promise<{ access_token: string }> {
    try {
      let account: any = null;
      if (organization) {
        account = await this.employeesService.findByIdentifierAndOrganization(
          identifier,
          organization,
        );

        if (!account) {
          throw new Error('EMPLOYEE_NOT_FOUND');
        }
      } else {
        account = await this.usersService.findByIdentifier(identifier);
        if (!account || account.status !== UserStatus.ACTIVE) {
          throw new Error('USER_NOT_FOUND');
        }
      }

      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        throw new Error('INVALID_PASSWORD');
      }

      const payload = { account };

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

  async signUp(signUpDto: Record<string, any>) {
    return this.usersService.create(signUpDto);
  }
}
