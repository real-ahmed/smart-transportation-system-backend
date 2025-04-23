import { Module } from '@nestjs/common';
import { OnboardController } from './onboard.controller';
import { OnboardService } from './onboard.service';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  controllers: [OnboardController],
  providers: [OnboardService],
  exports: [OnboardService],
  imports: [MembershipsModule],
})
export class OnboardModule {}
