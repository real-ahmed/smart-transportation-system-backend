import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { OnboardModule } from './onboard/onboard.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { on } from 'events';
import { OnboardController } from './onboard/onboard.controller';

@Module({
  controllers: [OnboardController],
  imports: [
    RouterModule.register([
      {
        path: 'member',
        module: MemberModule,
      },
    ]),
    OnboardModule,
  ],
})
export class MemberModule {}
