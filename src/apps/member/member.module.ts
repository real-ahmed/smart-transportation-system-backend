import { Module } from '@nestjs/common';
import { OnboardController } from './controllers/onboard.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [OnboardController],
  imports: [
    RouterModule.register([
      {
        path: 'member',
        module: MemberModule,
      },
    ]),
  ],
})
export class MemberModule {}
