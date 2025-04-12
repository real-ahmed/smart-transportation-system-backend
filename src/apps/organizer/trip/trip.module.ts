import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripsModule } from 'src/trips/trips.module';

@Module({
  imports: [
    TripsModule,
  ],
  controllers: [TripController],
  providers: [TripService],

})
export class TripModule { }
