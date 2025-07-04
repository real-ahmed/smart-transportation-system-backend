import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MembershipRequest,
  MembershipRequestSchema,
} from './membership-request.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersModule } from 'src/users/users.module';
import { AddressModule } from 'src/apps/organizer/address/address.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipRequest.name, schema: MembershipRequestSchema },
    ]),
    NotificationsModule,
    UsersModule,
    AddressesModule,
  ],

  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
