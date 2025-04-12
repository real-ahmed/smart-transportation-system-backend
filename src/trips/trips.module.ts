import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsService } from './trips.service';
import { Trip, TripSchema } from './trip.schema'; // Import the trip schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]), // Register the trip schema
  ],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule { }