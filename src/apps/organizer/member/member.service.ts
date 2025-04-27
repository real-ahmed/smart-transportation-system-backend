import { Injectable } from '@nestjs/common';
import { MembershipsService } from 'src/memberships/memberships.service';
import { MembersService } from 'src/users/services/members.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly membersService: MembersService,
    private memberships: MembershipsService,
  ) {}

  async findAll(
    request: Request,
    page: number = 1,
    limit: number = 10,
    organizationId: string,
  ) {
    const filter = {
      organizations: [organizationId],
    };
    return this.membersService.findAll(page, limit, filter);
  }

  async findOne(id: string) {
    return this.membersService.findOne(id);
  }

  getMembershipRequests(organization: string) {
    return this.memberships.getMembershipRequests({
      organization: organization,
      status: 'pending',
    });
  }

  async approvalMembershipRequest(membershipRequest) {
    return this.memberships.approveMembershipRequest(membershipRequest);
  }
}
