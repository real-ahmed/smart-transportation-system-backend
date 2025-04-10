import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [],
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
