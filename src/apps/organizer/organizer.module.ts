import { Module } from '@nestjs/common';

import { OnboardController } from './controllers/onboard.controller';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { OnboardService } from './services/onboard.service';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizersService } from 'src/users/services/organizers.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizerGuard } from './guards/organizer.guard';

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
  providers: [
    OnboardService,
    OrganizationService,
    OrganizerGuard,
    {
      provide: 'MODULE_GUARD',
      useFactory: (guard: OrganizerGuard) => guard,
      inject: [OrganizerGuard],
    },
  ],
  exports: [OnboardService, OrganizationService],
})
export class OrganizerModule {}
