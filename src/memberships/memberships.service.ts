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

  async getMembershipRequests(filter) {
    const query: any = {};
    return this.membershipRequestModel.find(filter).exec();
  }

  //   async getMembershipRequests(filter: {
  //     organizationId?: string;
  //     userId?: string;
  //     status?: 'pending' | 'approved' | 'rejected';
  //   }) {
  //     const query: any = {};

  //     if (filter.organizationId) {
  //       query.organizationId = new Types.ObjectId(filter.organizationId);
  //     }
  //     if (filter.userId) {
  //       query.userId = new Types.ObjectId(filter.userId);
  //     }
  //     if (filter.status) {
  //       query.status = filter.status;
  //     }

  //     return this.membershipRequestModel
  //       .find(query)
  //       .sort({ createdAt: -1 })
  //       .exec();
  //   }

  //   async updateMembershipRequest(
  //     requestId: string,
  //     updateData: {
  //       status: 'approved' | 'rejected';
  //       responseMessage?: string;
  //     },
  //   ) {
  //     const request = await this.membershipRequestModel.findById(requestId);
  //     if (!request) {
  //       throw new NotFoundException('Membership request not found');
  //     }

  //     request.status = updateData.status;
  //     request.responseMessage = updateData.responseMessage;
  //     request.updatedAt = new Date();

  //     const updatedRequest = await request.save();

  //     // If request is approved, add user to organization
  //     if (updateData.status === 'approved') {
  //       await this.membersService.subscribeToOrganization(
  //         request.userId.toString(),
  //         request.organizationId.toString(),
  //       );
  //     }

  //     // Notify user about request status

  //     return updatedRequest;
  //   }

  //   async deleteMembershipRequest(requestId: string) {
  //     const request =
  //       await this.membershipRequestModel.findByIdAndDelete(requestId);
  //     if (!request) {
  //       throw new NotFoundException('Membership request not found');
  //     }
  //     return request;
  //   }
}
