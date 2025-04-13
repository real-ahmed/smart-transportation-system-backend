import { Injectable } from '@nestjs/common';
import { Trip } from 'src/trips/trip.schema';
import { TripsService } from 'src/trips/trips.service';
import { TripDto } from './dtos/trip.dto';

@Injectable()
export class TripService {
    constructor(private readonly tripsService: TripsService) { }

    async createTrip(createTripDto: TripDto): Promise<Trip> {
        return this.tripsService.create(createTripDto);
    }

    async findAll(organizationId: string, page: number, limit: number) {
        return this.tripsService.findAll(page, limit, { organization: organizationId });
    }


    async findOne(id: string): Promise<Trip | null> {
        return this.tripsService.findById(id);
    }

    async update(id: string, updateTripDto: TripDto): Promise<Trip | null> {
        return this.tripsService.update(id, updateTripDto);
    }

    async delete(id: string): Promise<Trip | null> {
        return this.tripsService.delete(id);
    }
}