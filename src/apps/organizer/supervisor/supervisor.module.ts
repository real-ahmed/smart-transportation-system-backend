import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
@Module({
  imports: [UsersModule, OrganizationsModule],
  providers: [SupervisorService],
  controllers: [SupervisorController]
})
export class SupervisorModule {}
