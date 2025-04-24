import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { UsersModule } from 'src/users/users.module';
import { BusesModule } from 'src/buses/buses.module';
import { TripsModule } from 'src/trips/trips.module';

@Module({
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
  imports: [TripsModule, BusesModule, UsersModule],
})
export class TripModule {}
