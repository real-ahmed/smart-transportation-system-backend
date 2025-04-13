import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripsModule } from 'src/trips/trips.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TripsModule,
    NotificationsModule,
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule { }
