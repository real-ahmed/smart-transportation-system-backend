import { UseGuards, applyDecorators } from '@nestjs/common';
import { OrganizerGuard } from '../guards/organizer.guard';

// Create a decorator that applies the guard
export function OrganizerProtected() {
  return applyDecorators(UseGuards(OrganizerGuard));
}

// Base controller with guard applied
@OrganizerProtected()
export abstract class BaseOrganizerController {}
