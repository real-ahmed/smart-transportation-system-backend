import { Controller, Get } from '@nestjs/common';
import { BaseSupervisorController } from '../base-supervisor.controller';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController extends BaseSupervisorController {
    constructor(private readonly tripService: TripService) {
        super();
    }

    @Get()
    async getTrips() {
        // return this.tripService.findAll();
    }
}