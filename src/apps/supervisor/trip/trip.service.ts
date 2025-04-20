import { Injectable } from '@nestjs/common';
import { BusService } from 'src/apps/organizer/bus/bus.service';
import { BusesService } from 'src/buses/buses.service';
import { Trip } from 'src/trips/trip.schema';
import { TripsService } from 'src/trips/trips.service';
import { Employee } from 'src/users/schemas/employee.schema';
import { Student } from 'src/users/schemas/student.schema';
import { DriversService } from 'src/users/services/drivers.service';
import { EmployeesService } from 'src/users/services/employees.service';
import { StudentsService } from 'src/users/services/students.service';

@Injectable()
export class TripService {
  constructor(
    private readonly tripsService: TripsService,
    private readonly busesService: BusesService,
    private readonly employeesService: EmployeesService,
    private readonly studentsService: StudentsService,
  ) {}
  async findAll(): Promise<Trip[]> {
    // return this.tripsService.findAll();
    return [];
  }

  async findNextTrip(request: Request) {
    let trip = await this.tripsService.findAll(-1, -1, {
      status: 'waiting',
      supervisor: request['user']['_id'],
      date: { $gte: new Date() },
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

  async getTripStudents(request: Request, tripId: string) {
    let trip = await this.tripsService.findAll(1, 1, {
      supervisor: request['user']['_id'],
      _id: tripId,
    });
    if (trip['results'].length === 0) {
      return null;
    }
    trip = trip['results'][0];
    const tripStudents = await Promise.all(
      trip['students'].map((student: any) =>
        this.studentsService.findOne(student),
      ),
    );
    return tripStudents;
  }
}
