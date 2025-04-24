import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Driver } from '../schemas/driver.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';

@Injectable()
export class DriversService {
  findByUser(arg0: any) {
      throw new Error('Method not implemented.');
  }
  constructor(
    public readonly employeesService: EmployeesService,
    @InjectModel(Driver.name) protected readonly model: Model<Driver>,
  ) {}

  async create(createDto): Promise<Driver> {
    const employee = await this.employeesService.create(createDto);
    createDto['employee'] = employee;
    const created = new this.model(createDto);
    return created.save();
  }

  async findAll(page: number = 1, limit: number = 10, filter = {}) {
    return getPaginatedResults(this.model, page, limit, filter);
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.model.findById(id).exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }



  async update(id: string, updateDto: any): Promise<Driver> {
    const updatedDriver = await this.model
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();

    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return updatedDriver;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedDriver = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return { message: `Driver with ID ${id} has been removed successfully` };
  }
}
