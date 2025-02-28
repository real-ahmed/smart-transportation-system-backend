import { Module } from '@nestjs/common';

import { OnboardController } from './controllers/onboard.controller';
import { RouterModule, Routes } from '@nestjs/core';
import { OnboardService } from './services/onboard.service';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizersService } from 'src/users/services/organizers.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OnboardController, OrganizationController],
  imports: [
    UsersModule,
    OrganizationsModule,
    AddressesModule,
    RouterModule.register([
      {
        path: 'organizer',
        module: OrganizerModule,
      },
    ]),
  ],
  providers: [OnboardService, OrganizationService],
  exports: [OnboardService, OrganizationService],
})
export class OrganizerModule {}
