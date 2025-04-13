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
import { SupervisorModule } from './supervisor/supervisor.module';
import { SupervisorService } from './supervisor/supervisor.service';
import { SupervisorController } from './supervisor/supervisor.controller';
import { BusModule } from './bus/bus.module';
import { BusController } from './bus/bus.controller';
import { BusService } from './bus/bus.service';
import { BusesModule } from 'src/buses/buses.module';
import { MaintenanceController } from './bus/maintenance/maintenance.controller';
import { MaintenanceModule } from './bus/maintenance/maintenance.module';
import { MaintenancesModule } from 'src/buses/maintenances/maintenances.module';
import { MaintenanceService } from './bus/maintenance/maintenance.service';
import { MemberModule } from './member/member.module';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { OrganizationAccessGuard } from './common/guards/organization-access.guard';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { TripModule } from './trip/trip.module';
import { TripController } from './trip/trip.controller';
import { TripService } from './trip/trip.service';
import { TripsModule } from 'src/trips/trips.module';

import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';

@Module({
  controllers: [
    OnboardController,
    OrganizationController,
    DriverController,
    SupervisorController,
    BusController,
    MaintenanceController,
    MemberController,
    StudentController,
    TripController,
    NotificationController,
  ],
  imports: [
    UsersModule,
    OrganizationsModule,
    DriverModule,
    AddressesModule,
    SupervisorModule,
    RouterModule.register([
      {
        path: 'organizer',
        module: OrganizerModule,
      },
    ]),
    OrganizationModule,
    OnboardModule,
    BusModule,
    BusesModule,
    MaintenanceModule,
    MaintenancesModule,
    MemberModule,
    StudentModule,
    TripModule,
    TripsModule,
    NotificationsModule,
    NotificationModule,
  ],
  providers: [
    OnboardService,
    OrganizationService,
    DriverService,
    SupervisorService,
    BusService,
    OrganizerGuard,
    OrganizationAccessGuard,
    MaintenanceService,
    MemberService,
    StudentService,
    TripService,
    NotificationService,

    {
      provide: 'MODULE_GUARD',
      useFactory: (guard: OrganizerGuard) => guard,
      inject: [OrganizerGuard],
    },
  ],
  exports: [OnboardService, OrganizationService],
})
export class OrganizerModule { }
