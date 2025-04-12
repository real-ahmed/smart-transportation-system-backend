import { Injectable } from '@nestjs/common';
import { Trip, TripDocument } from './trip.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<TripDocument>,
  ) {}

  async create(createTripDto: any): Promise<Trip> {
    const newTrip = await this.tripModel.create(createTripDto);
    return newTrip;
  }

  async findAll(page: number = 1, limit: number = 10, filter: any = {}) {
    return getPaginatedResults(this.tripModel, page, limit, filter);
  }

  async findById(id: string): Promise<Trip | null> {
    const trip = await this.tripModel
      .findById(id)
      .populate(['bus', 'driver', 'supervisor', 'students', 'organization'])
      .exec();
    return trip;
  }

  async update(id: string, updateTripDto: any): Promise<Trip | null> {
    const trip = await this.tripModel.findByIdAndUpdate(id, updateTripDto, { new: true });
    return trip;
  }

  async delete(id: string): Promise<Trip | null> {
    const trip = await this.tripModel.findByIdAndDelete(id);
    return trip;
  }
}
