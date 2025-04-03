import { Module } from '@nestjs/common';
import { SupervisorService } from '../subervisor/supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [SupervisorService],
  controllers: [SupervisorController]
})
export class SupervisorModule {}
