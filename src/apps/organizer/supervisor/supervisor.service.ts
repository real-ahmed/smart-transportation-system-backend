import { Injectable, NotFoundException } from '@nestjs/common';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { SupervisorsService } from 'src/users/services/supervisors.service';

@Injectable()
export class SupervisorService {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  async create(
    request: Request,
    createSupervisorDto: Record<string, any>,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const imageUrl = await uploadFile(file, 'supervisors');
      createSupervisorDto.image = imageUrl;
    }
    return this.supervisorsService.create(createSupervisorDto);
  }

  async findAll(request: Request, page: number = 1, limit: number = 10) {
    const user = request['user'];
    const employees = await this.supervisorsService.employeesService.findByOrganizationOwner(user.id);
    const employeeIds = employees.map(employee => employee._id);
    return this.supervisorsService.findAll(page, limit, {
      employee: { $in: employeeIds }
    });
  }

  async findOne(request: Request, id: string) {
    const supervisor = await this.supervisorsService.findOne(id);
    if (!supervisor) {
      throw new NotFoundException(`Supervisor with ID ${id} not found`);
    }
    return supervisor;
  }

  async update(
    request: Request,
    id: string,
    updateSupervisorDto: Record<string, any>,
    file?: Express.Multer.File,
  ) {
    const existingSupervisor = await this.findOne(request, id);
    if (file) {
      const imageUrl = await uploadFile(file, 'supervisors');
      updateSupervisorDto.image = imageUrl;
    }
    return this.supervisorsService.update(id, {
      ...existingSupervisor,
      ...updateSupervisorDto,
    });
  }

  async remove(request: Request, id: string) {
    const supervisor = await this.findOne(request, id);
    return this.supervisorsService.remove(id);
  }
}
