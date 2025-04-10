import { Injectable } from '@nestjs/common';
import { Bus, BusDocument } from './bus.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';

@Injectable()
export class BusesService {
    constructor(
        @InjectModel(Bus.name)
        private readonly busModel: Model<BusDocument>,
    ) { }

    async create(bus: any) {
        return await this.busModel.create(bus);
    }

    async findAll(page: number = 1, limit: number = 10, filter: any = {}) {
        return getPaginatedResults(this.busModel, page, limit, filter);
    }

    async findById(id: string) {
        return await this.busModel.findById(id);
    }

    async update(id: string, bus: any) {
        return await this.busModel.findByIdAndUpdate(id, bus, { new: true });
    }

    async delete(id: string) {
        return await this.busModel.findByIdAndDelete(id);
    }


    async getCurrentLocation(id: string) {
        const bus = await this.busModel.findById(id, { locationHistory: { $slice: -1 } });
        if (!bus?.locationHistory?.length) return null;
        return bus.locationHistory[0];
    }

    async getLocationHistory(id: string) {
        return await this.busModel.findById(id, 'locationHistory');
    }

    async updateLocation(id: string, location: { latitude: number, longitude: number, timestamp: Date }) {
        return await this.busModel.findByIdAndUpdate(id, { locationHistory: { $push: location } }, { new: true });
    }




}
