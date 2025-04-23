import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MembershipRequest,
  MembershipRequestDocument,
} from './membership-request.schema';
import { Model, Types } from 'mongoose';
import { NotificationEventsService } from 'src/notifications/notification-events.service';
import { NotificationType } from 'src/notifications/notification.schema';
import { MembersService } from 'src/users/services/members.service';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(MembershipRequest.name)
    private membershipRequestModel: Model<MembershipRequestDocument>,
    private readonly notificationEventsService: NotificationEventsService,
    private readonly membersService: MembersService,
  ) {}

  async createMembershipRequest(
    userId: string,
    organizationId: string,
    studentData: object,
  ) {
    const existingRequest = await this.membershipRequestModel.findOne({
      member: new Types.ObjectId(userId),
      organization: new Types.ObjectId(organizationId),
      status: 'pending',
    });

    if (existingRequest) {
      throw new Error('A pending request already exists');
    }

    const newRequest = new this.membershipRequestModel({
      member: new Types.ObjectId(userId),
      organization: new Types.ObjectId(organizationId),
      ...studentData,
      status: 'pending',
    });

    const savedRequest = await newRequest.save();

    // Notify organization about new membership request
    await this.notificationEventsService.notifyOrganization(
      organizationId,
      userId,
      'New Membership Request',
      'A new user has requested to join your organization',
      NotificationType.INFO,
      { requestId: savedRequest._id },
    );

    return savedRequest;
  }
}
