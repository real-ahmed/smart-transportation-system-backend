import { Module } from '@nestjs/common';
import { OnboardController } from './onboard.controller';
import { OnboardService } from './onboard.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { OrganizationService } from '../organization/organization.service';

@Module({
  imports: [UsersModule, OrganizationsModule, AddressesModule],
  controllers: [OnboardController],
  providers: [OnboardService, OrganizationService],
})
export class OnboardModule {}
