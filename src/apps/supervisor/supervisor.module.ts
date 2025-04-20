import { Module, forwardRef } from '@nestjs/common';
import { TripController } from './trip/trip.controller';
import { TripModule } from './trip/trip.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from '../../users/users.module';
import { AppModule } from 'src/app.module';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { ProfileModule } from './profile/profile.module';
@Module({
  controllers: [TripController, NotificationController],
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
    NotificationModule,
    ProfileModule,
  ],
})
export class SupervisorModule { }
