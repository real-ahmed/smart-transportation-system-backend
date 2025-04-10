import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from './maintenance.schema';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';

@Injectable()
export class MaintenancesService {
    constructor(@InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>) { }

    async create(maintenance: any): Promise<Maintenance> {
        const newMaintenance = new this.maintenanceModel(maintenance);
        return newMaintenance.save();
    }

    async findAll(page: number = 1, limit: number = 10, filter: any = {}) {
        return getPaginatedResults(this.maintenanceModel, page, limit, filter);

    }
    async findById(id: string): Promise<Maintenance> {
        const maintenance = await this.maintenanceModel.findById(id).exec();
        if (!maintenance) {
            throw new Error('Maintenance not found');
        }
        return maintenance;
    }

    async update(id: string, maintenance: any): Promise<Maintenance> {
        const updatedMaintenance = await this.maintenanceModel.findByIdAndUpdate(id, maintenance, { new: true }).exec();
        if (!updatedMaintenance) {
            throw new Error('Maintenance not found');
        }
        return updatedMaintenance;
    }

    async delete(id: string): Promise<void> {
        await this.maintenanceModel.findByIdAndDelete(id).exec();
    }
}
