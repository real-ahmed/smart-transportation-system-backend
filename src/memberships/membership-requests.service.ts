import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// import { MembershipRequest } from './membershipRequest.schema';
import { NotificationEventsService } from '../notifications/notification-events.service';
import { MembersService } from '../users/services/members.service';

@Injectable()
export class MembershipRequestsService {
  constructor(
    // @InjectModel(MembershipRequest.name)
    // private readonly membershipRequestModel: Model<memberShipRequest>,

  ) {}



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
