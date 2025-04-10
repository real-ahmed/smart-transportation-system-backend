import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { BusesModule } from 'src/buses/buses.module';
import { UsersModule } from 'src/users/users.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
@Module({
  imports: [BusesModule, OrganizationsModule, UsersModule, MaintenanceModule],
  providers: [BusService],
  controllers: [BusController],
})
export class BusModule { }
