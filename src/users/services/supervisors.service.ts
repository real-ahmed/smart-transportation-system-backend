import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getPaginatedResults, paginate } from 'src/common/helpers/pagination.helper';
import { Supervisor } from '../schemas/supervisor.schema';

@Injectable()
export class SupervisorsService {
  constructor(
    public readonly employeesService: EmployeesService,
    @InjectModel(Supervisor.name) protected readonly model: Model<Supervisor>,
  ) { }

  async create(createDto): Promise<Supervisor> {
    const employee = await this.employeesService.create(createDto);
    createDto['employee'] = employee;
    const created = new this.model(createDto);
    return created.save();
  }

  async findAll(page: number = 1, limit: number = 10, filter = {}) {
    return getPaginatedResults(this.model, page, limit, filter);
  }

  async findOne(id: string): Promise<Supervisor> {
    const supervisor = await this.model.findById(id).exec();
    if (!supervisor) {
      throw new NotFoundException(`Supervisor with ID ${id} not found`);
    }
    return supervisor;
  }

  async findByUser(userId: string): Promise<Supervisor[]> {
    const supervisors = await this.model.find({ employee: new Types.ObjectId(userId) }).exec();
    return supervisors;
  }

  async update(id: string, updateDto: any): Promise<Supervisor> {
    const updatedSupervisor = await this.model
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();

    if (!updatedSupervisor) {
      throw new NotFoundException(`Supervisor with ID ${id} not found`);
    }

    return updatedSupervisor;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedSupervisor = await this.model.findByIdAndDelete(id).exec();

    if (!deletedSupervisor) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return {
      message: `Supervisor with ID ${id} has been removed successfully`,
    };
  }
}
