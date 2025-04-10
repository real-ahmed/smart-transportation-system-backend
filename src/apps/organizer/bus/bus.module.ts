import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { BusesModule } from 'src/buses/buses.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [BusesModule, OrganizationsModule, UsersModule],
  providers: [BusService],
  controllers: [BusController],
})
export class BusModule { }
