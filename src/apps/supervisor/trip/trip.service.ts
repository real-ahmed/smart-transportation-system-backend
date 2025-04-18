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

    async findNextTrip(request: Request): Promise<Trip> {

        const trip = await this.tripsService.findAll(1, 1, {
            status: { $ne: 'waiting' },
            supervisor: { $ne: request['user']._id }
        })[0];
        trip['bus'] = trip['bus']['name'];
        trip['driver'] = trip['driver']['name'];
        trip['totalStudents'] = trip['students'].length;
        return trip;
    }

    async getTripStudents(request: Request) {
        const trip = await this.tripsService.findAll(1, 1, {
            status: { $ne: 'waiting' },
            supervisor: { $ne: request['user']._id }
        })[0];
        const tripStudents = trip['students'].map((student: any) => {
            return {
                _id: student._id,
                name: student.name,
                image: student.image
            }
        });
        return tripStudents;
    }
}
