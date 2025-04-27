import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { OnboardModule } from './onboard/onboard.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { OnboardController } from './onboard/onboard.controller';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';

@Module({
  controllers: [OnboardController, StudentController, NotificationController],
  imports: [
    RouterModule.register([
      {
        path: 'member',
        module: MemberModule,
      },
    ]),
    OnboardModule,
    StudentModule,
    NotificationModule,
  ],
})
export class MemberModule {}
