import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { OrganizersService } from 'src/users/services/organizers.service';

@Injectable()
export class OrganizerGuard implements CanActivate {
  constructor(private readonly organizerService: OrganizersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const organizer = await this.organizerService.findByUser(
      request['user']['_id'],
    );

    if (!organizer) {
      throw new UnauthorizedException('User is not an organizer');
    }

    request['user']['organizer'] = organizer;

    return true;
  }
}
