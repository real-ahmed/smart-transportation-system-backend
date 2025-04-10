import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Maintenance, MaintenanceSchema } from './maintenance.schema';
import { MaintenancesService } from './maintenances.service';

@Module({
  providers: [MaintenancesService],
  imports: [MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }])],
  exports: [MaintenancesService],
})
export class MaintenancesModule { }
