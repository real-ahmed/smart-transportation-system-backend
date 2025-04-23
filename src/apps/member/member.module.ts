import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { OnboardModule } from './onboard/onboard.module';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  controllers: [],
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
