import { Injectable } from '@nestjs/common';
import { BusService } from 'src/apps/organizer/bus/bus.service';
import { BusesService } from 'src/buses/buses.service';
import { Trip } from 'src/trips/trip.schema';
import { TripsService } from 'src/trips/trips.service';

@Injectable()
export class TripService {
  constructor(
    private readonly tripsService: TripsService,
    private readonly busesService: BusesService,
  ) {}
  async findAll(): Promise<Trip[]> {
    // return this.tripsService.findAll();
    return [];
  }

  async findNextTrip(request: Request) {
    const trip = await this.tripsService.findAll(-1, -1, {
      status: { $ne: 'waiting' },

      supervisor: request['user']._id,
    });
    // trip['results'] = await this.busesService.findById(
    //   trip['results'][0]['bus'],
    // )['name'];
    console.log(trip['results'][0]['bus']);
    trip['results'][0]['bus'] = await this.busesService.findById(
      trip['results'][0]['bus'],
    );

    // trip['results'][0]['driver'] = await
    // trip['driver'] = trip['driver']['name'];
    // trip['totalStudents'] = trip['students'].length;
    return trip;
  }

  async getTripStudents(request: Request) {
    const trip = await this.tripsService.findAll(1, 1, {
      status: { $ne: 'waiting' },
      supervisor: { $ne: request['user']._id },
    })[0];
    const tripStudents = trip['students'].map((student: any) => {
      return {
        _id: student._id,
        name: student.name,
        image: student.image,
      };
    });
    return tripStudents;
  }
}
