import { Injectable } from '@nestjs/common';
import { MaintenancesService } from 'src/buses/maintenances/maintenances.service';
import { MaintenanceDto } from './dtos/maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  async create(maintenance: MaintenanceDto) {
    return this.maintenancesService.create(maintenance);
  }

  async findAll(
    request: Request,
    page: number = 1,
    limit: number = 10,
    organizationId: string,
  ) {
    const filter = organizationId ? { organizationId } : {};
    return this.maintenancesService.findAll(page, limit, filter);
  }

  async findOne(request: Request, id: string) {
    return this.maintenancesService.findById(id);
  }

  async findById(id: string) {
    return this.maintenancesService.findById(id);
  }

  async update(request: Request, id: string, maintenance: MaintenanceDto) {
    return this.maintenancesService.update(id, maintenance);
  }

  async remove(request: Request, id: string) {
    return this.maintenancesService.delete(id);
  }

  async delete(id: string) {
    return this.maintenancesService.delete(id);
  }
}
