import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async findByIdentifierAndOrganization(
    identifier: string,
    organization: string,
  ): Promise<Employee | null> {
    return this.employeeModel
      .findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
        organization,
      })
      .select('+password')
      .populate(['driver', 'supervisor'])
      .exec();
  }
}
