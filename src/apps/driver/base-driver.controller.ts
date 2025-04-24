import { UseGuards, applyDecorators } from '@nestjs/common';
import { DriverGuard } from './common/guards/driver.guard';
// Create a decorator that applies the guard
export function DriverProtected() {
  return applyDecorators(UseGuards(DriverGuard));
}

// export function OrganizationAccessProtected() {
//   return applyDecorators(UseGuards(OrganizationAccessGuard));
// }

// Base controller with guard applied
@DriverProtected()
export abstract class BaseDriverController {}
