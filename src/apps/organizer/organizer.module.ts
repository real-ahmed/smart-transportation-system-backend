import { Module } from '@nestjs/common';

import { OnboardController } from './onboard/onboard.controller';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { OnboardService } from './onboard/onboard.service';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizerGuard } from './common/guards/organizer.guard';
import { OrganizationModule } from './organization/organization.module';
import { OnboardModule } from './onboard/onboard.module';
import { DriverController } from './driver/driver.controller';
import { DriverModule } from '../driver/driver.module';
import { DriverService } from './driver/driver.service';

@Module({
  controllers: [OnboardController, OrganizationController, DriverController],
  imports: [
    UsersModule,
    OrganizationsModule,
    DriverModule,
    AddressesModule,
    RouterModule.register([
      {
        path: 'organizer',
        module: OrganizerModule,
      },
    ]),
    OrganizationModule,
    OnboardModule,
  ],
  providers: [
    OnboardService,
    OrganizationService,
    DriverService,
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
