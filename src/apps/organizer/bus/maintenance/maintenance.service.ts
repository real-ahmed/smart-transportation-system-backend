import { Injectable } from '@nestjs/common';
import { MaintenancesService } from 'src/buses/maintenances/maintenances.service';
import { MaintenanceDto } from './dtos/maintenance.dto';

@Injectable()
export class MaintenanceService {
    findOne(request: Request, id: string) {
        throw new Error('Method not implemented.');
    }
    remove(request: Request, id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly maintenancesService: MaintenancesService) { }

    async create(maintenance: MaintenanceDto, createMaintenanceDto: MaintenanceDto) {
        return this.maintenancesService.create(maintenance);
    }

    async findAll(request: Request, page: number = 1, limit: number = 10, filter: any = {}) {
        return this.maintenancesService.findAll(page, limit, filter);
    }

    async findById(id: string) {
        return this.maintenancesService.findById(id);
    }

    async update(request: Request, id: string, maintenance: MaintenanceDto) {
        return this.maintenancesService.update(id, maintenance);
    }

    async delete(id: string) {
        return this.maintenancesService.delete(id);
    }
}