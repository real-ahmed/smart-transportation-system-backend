import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripsModule } from '../../../trips/trips.module';
import { BusesModule } from 'src/buses/buses.module';
import { Driver } from 'src/users/schemas/driver.schema';
import { DriverModule } from 'src/apps/driver/driver.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TripsModule, BusesModule, UsersModule],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
