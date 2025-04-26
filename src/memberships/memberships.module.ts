import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MembershipRequest,
  MembershipRequestSchema,
} from './membership-request.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipRequest.name, schema: MembershipRequestSchema },
    ]),
    NotificationsModule,
    UsersModule,
  ],

  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
