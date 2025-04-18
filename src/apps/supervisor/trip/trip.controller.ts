import { Controller, Get, Req } from '@nestjs/common';
import { BaseSupervisorController } from '../base-supervisor.controller';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController extends BaseSupervisorController {
    constructor(private readonly tripService: TripService) {
        super();
    }

    @Get("nextTrip")
    async getTrips(
        @Req() request: Request
    ) {
        return this.tripService.findNextTrip(request);
    }


    @Get('tripStudents')
    async tripStudents(@Req() request) {
        return this.tripStudents(request);
    }
}