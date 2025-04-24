import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { DriversService } from 'src/users/services/drivers.service';
import { SupervisorsService } from 'src/users/services/supervisors.service';

@Injectable()
export class DriverGuard implements CanActivate {
  constructor(private readonly driverService: DriversService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const supervisor = await this.driverService.findByUser(
        request['user']['_id'],
      );

      request['user']['driver'] = supervisor;
      return true;
    } catch (error) {
      throw new UnauthorizedException('User is not a driver');
    }
  }
}
