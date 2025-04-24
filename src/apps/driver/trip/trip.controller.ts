import { Controller, Get, Param, Req } from '@nestjs/common';
import { BaseDriverController } from '../base-driver.controller';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController extends BaseDriverController {
  constructor(private readonly tripService: TripService) {
    super();
  }

  @Get('nextTrip')
  async getTrips(@Req() request: Request) {
    return this.tripService.findNextTrip(request);
  }

  @Get('tripStudents/:tripId')
  async tripStudents(@Req() request: Request, @Param('tripId') tripId: string) {
    return this.tripService.getTripStudents(request, tripId);
  }
}
