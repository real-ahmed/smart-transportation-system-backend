import { Controller, Get, Req } from '@nestjs/common';
import { BaseSupervisorController } from '../base-supervisor.controller';
import { TripService } from './trip.service';
import { Request } from 'express';

@Controller('trip')
export class TripController extends BaseSupervisorController {
    constructor(private readonly tripService: TripService) {
        super();
    }

    @Get()
    async getTrips(@Req() request: Request) {
        return this.tripService.findAll();
    }
}