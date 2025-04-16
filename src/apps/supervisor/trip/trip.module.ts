import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripsModule } from '../../../trips/trips.module';

@Module({
  imports: [TripsModule],
  providers: [TripService],
  exports: [TripService]
})
export class TripModule { }
