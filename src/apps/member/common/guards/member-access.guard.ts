import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { MembersService } from 'src/users/services/members.service';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class MemberAccessGuard implements CanActivate {
  constructor(
    private readonly membersService: MembersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Destructure with default empty objects
    const { params = {}, body = {}, query = {} } = request;

    // Check organization ID from multiple possible locations
    const organizationId =
      params.organizationId ||
      body.organizationId ||
      query.organizationId ||
      body.organization ||
      query.organization ||
      params.organization;

    if (!organizationId) {
      return true; // Skip check if no organization ID provided
    }

    const hasAccess = await this.checkMemberAccessToOrganization(
      user,
      organizationId,
    );
    if (!hasAccess) {
      throw new UnauthorizedException(
        'You do not have access to this organization',
      );
    }

    return true;
  }

  private async checkMemberAccessToOrganization(
    user: any,
    organizationId: string,
  ): Promise<boolean> {
    if (!user || !organizationId) {
      return false;
    }

    // Get the member record for this user
    const member = await this.membersService.findByUser(user._id);
    if (!member) {
      return false;
    }

    // Check if member is subscribed to this organization
    const isSubscribed = member.organizations.some(
      (orgId) => orgId.toString() === organizationId,
    );

    return isSubscribed;
  }
}
