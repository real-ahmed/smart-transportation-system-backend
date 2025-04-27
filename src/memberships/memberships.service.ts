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
import { StudentsService } from 'src/users/services/students.service';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(MembershipRequest.name)
    private membershipRequestModel: Model<MembershipRequestDocument>,
    private readonly notificationEventsService: NotificationEventsService,
    private readonly membersService: MembersService,
    private readonly studentsService: StudentsService,
    private readonly addressesService: AddressesService,
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

  async approveMembershipRequest(membershipRequestModelId: string) {
    const request = await this.membershipRequestModel.findById(
      membershipRequestModelId,
    );
    if (!request) {
      throw new Error('Membership request not found');
    }
    if (request.status !== 'pending') {
      throw new Error('Membership request is not pending');
    }

    let student: any = await this.studentsService.findBySsn(request.studentSsn);

    if (!student) {
      const address = await this.addressesService.create({
        street: request.street,
        city: request.city,
        state: request.state,
        postalCode: request.postalCode,
        phoneNumber: request.phoneNumber,
        owner: request.member,
      });

      student = await this.studentsService.create({
        name: request.studentName,
        ssn: request.studentSsn,
        disabilities: request.studentDisabilities,
        image: request.studentImage,
        address: address,
        phoneNumber: request.phoneNumber,
        guardian: request.member,
        organization: request.organization,
      });
    }

    request.status = 'approved';
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
