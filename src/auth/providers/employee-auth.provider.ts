import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../../users/services/employees.service';
import { BaseAuthProvider } from './base-auth.provider';
import { BaseUser } from 'src/users/schemas/base-user.schema';

@Injectable()
export class EmployeeAuthProvider extends BaseAuthProvider {
  constructor(private employeesService: EmployeesService) {
    super();
  }

  async findAccount(
    identifier: string,
    organizationId: string = '',
  ): Promise<BaseUser | null> {
    return this.employeesService.findByIdentifierAndOrganization(
      identifier,
      organizationId,
    );
  }

  validateStatus(account: BaseUser): boolean {
    return true; // Implement employee-specific status validation if needed
  }

  async createAccount(signUpDto: Record<string, any>): Promise<BaseUser> {
    return this.employeesService.create(signUpDto);
  }
}
