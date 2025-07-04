import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { MembersService } from 'src/users/services/members.service';

@Injectable()
export class MemberGuard implements CanActivate {
  constructor(private readonly membersService: MembersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const member = await this.membersService.findByUser(request['user']['_id']);

    if (!member) {
      throw new UnauthorizedException('User is not a member');
    }

    request['user']['member'] = member;

    return true;
  }
}
