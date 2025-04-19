import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schemas/employee.schema';
import { BaseUsersService } from './base-users.service';

@Injectable()
export class EmployeesService extends BaseUsersService<Employee> {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {
    super(employeeModel);
  }

  async findByIdentifierAndOrganization(
    identifier: string,
    organization: string,
  ): Promise<Employee | null> {
    // Add your organization-specific logic here.
    // For example, querying by identifier and checking if the organization matches.
    // This is a placeholder implementation:
    return this.employeeModel
      .findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
        organization, // ensure your Employee schema and DTO include this property
      })
      .exec();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async findByOrganizationOwner(ownerId: string): Promise<Employee[]> {
    return this.employeeModel.find({ 'organization.owner': ownerId }).exec();
  }
}
