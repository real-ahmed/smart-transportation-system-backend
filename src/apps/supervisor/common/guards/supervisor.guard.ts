import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { SupervisorsService } from 'src/users/services/supervisors.service';

@Injectable()
export class SupervisorGuard implements CanActivate {
  constructor(private readonly supervisorService: SupervisorsService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Check if user exists in the request
    if (!request['user']) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const userId = request['user']['_id'];
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }

    const supervisor = await this.supervisorService.findByUser(userId);

    if (!supervisor) {
      throw new UnauthorizedException('User is not a supervisor');
    }

    request['user']['supervisor'] = supervisor;

    return true;
  }
}
