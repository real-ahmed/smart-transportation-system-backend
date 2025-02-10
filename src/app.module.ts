import { Module } from '@nestjs/common';
import { AdminModule } from './apps/admin/admin.module';
import { DriverModule } from './apps/driver/driver.module';
import { SupervisorModule } from './apps/supervisor/supervisor.module';
import { MemberModule } from './apps/member/member.module';
import { OrganizerModule } from './apps/organizer/organizer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { MONGOOSE_CONFIG } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync(MONGOOSE_CONFIG),
    AuthModule,
    AdminModule,
    DriverModule,
    SupervisorModule,
    MemberModule,
    OrganizerModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
