import { UseGuards, applyDecorators } from '@nestjs/common';
import { SupervisorGuard } from './common/guards/supervisor.guard';
// // Create a decorator that applies the guard
export function SupervisorProtected() {
  return applyDecorators(UseGuards(SupervisorGuard));
}

// export function OrganizationAccessProtected() {
//   return applyDecorators(UseGuards(OrganizationAccessGuard));
// }

// Base controller with guard applied
@SupervisorProtected()
export abstract class BaseSupervisorController { }
