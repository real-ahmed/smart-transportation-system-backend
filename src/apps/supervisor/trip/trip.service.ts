import { Injectable } from '@nestjs/common';
import { Trip } from 'src/trips/trip.schema';
import { TripsService } from 'src/trips/trips.service';

@Injectable()
export class TripService {
    constructor(private readonly tripsService: TripsService) { }
    async findAll(): Promise<Trip[]> {
        // return this.tripsService.findAll();
        return []
    }
}
