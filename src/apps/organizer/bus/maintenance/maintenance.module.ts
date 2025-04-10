import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenancesModule } from 'src/buses/maintenances/maintenances.module';
@Module({
  providers: [MaintenanceService],
  controllers: [MaintenanceController],
  imports: [MaintenancesModule],
})
export class MaintenanceModule {}
