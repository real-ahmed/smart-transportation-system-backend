import { Injectable } from '@nestjs/common';
import { BusService } from 'src/apps/organizer/bus/bus.service';
import { BusesService } from 'src/buses/buses.service';
import { Trip } from 'src/trips/trip.schema';
import { TripsService } from 'src/trips/trips.service';
import { Employee } from 'src/users/schemas/employee.schema';
import { DriversService } from 'src/users/services/drivers.service';
import { EmployeesService } from 'src/users/services/employees.service';

@Injectable()
export class TripService {
  constructor(
    private readonly tripsService: TripsService,
    private readonly busesService: BusesService,
    private readonly employeesService: EmployeesService,
  ) {}
  async findAll(): Promise<Trip[]> {
    // return this.tripsService.findAll();
    return [];
  }

  async findNextTrip(request: Request) {
    let trip = await this.tripsService.findAll(-1, -1, {
      status: { $ne: 'waiting' },

      supervisor: request['user']['_id'],
    });
    trip = trip['results'][0];

    return {
      _id: trip['_id'],
      bus: await this.busesService.findById(trip['bus']),
      driver: await this.employeesService.findById(trip['driver']),
      supervisor: await this.employeesService.findById(trip['supervisor']),
      totalStudents: trip['students'].length,
      status: trip['status'],
      startTime: trip['startTime'],
      endTime: trip['endTime'],
      Date: trip['date'],
    };
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
