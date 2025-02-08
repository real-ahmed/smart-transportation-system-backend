import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './apps/admin/admin.module';
import { DriverModule } from './apps/driver/driver.module';
import { SupervisorModule } from './apps/supervisor/supervisor.module';
import { MemberModule } from './apps/member/member.module';
import { OrganizerModule } from './apps/organizer/organizer.module';
import { CommonModule } from './common/common.module';
import { TripModule } from './trip/trip.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { NotificationModule } from './notification/notification.module';
import { LogsModule } from './logs/logs.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';

// @ts-ignore
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    DriverModule,
    SupervisorModule,
    MemberModule,
    OrganizerModule,
    CommonModule,
    TripModule,
    VehicleModule,
    NotificationModule,
    LogsModule,
    UtilsModule,
    UsersModule,
    EmployeesModule,
  ],
})
export class AppModule {}
