import { UseGuards, applyDecorators } from '@nestjs/common';
import { MemberGuard } from './common/guards/member.guard';
import { MemberAccessGuard } from './common/guards/member-access.guard';
// Create a decorator that applies the guard
export function MemberProtected() {
  return applyDecorators(UseGuards(MemberGuard));
}

export function MemberAccessProtected() {
  return applyDecorators(UseGuards(MemberAccessGuard));
}

// Base controller with guard applied
@MemberProtected()
@MemberAccessProtected()
export abstract class BaseMemberController {}
