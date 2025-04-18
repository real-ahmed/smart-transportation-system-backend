import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripsModule } from '../../../trips/trips.module';
import { BusesModule } from 'src/buses/buses.module';

@Module({
  imports: [TripsModule, BusesModule],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
