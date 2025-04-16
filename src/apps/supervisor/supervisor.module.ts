import { Module, forwardRef } from '@nestjs/common';
import { TripController } from './trip/trip.controller';
import { TripModule } from './trip/trip.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from '../../users/users.module';
import { AppModule } from 'src/app.module';

@Module({
  controllers: [TripController],
  imports: [
    forwardRef(() => AppModule),
    TripModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'supervisor',
        module: SupervisorModule,
      },
    ]),
  ],
})
export class SupervisorModule { }
