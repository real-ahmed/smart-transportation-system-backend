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
    return true;
  }
}
