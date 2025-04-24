import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TripModule } from './trip/trip.module';
import { UsersModule } from 'src/users/users.module';
import { TripController } from './trip/trip.controller';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'driver',
        module: DriverModule,
      },
    ]),
    TripModule,
    UsersModule,
  ],
  controllers: [TripController],
})
export class DriverModule {}
