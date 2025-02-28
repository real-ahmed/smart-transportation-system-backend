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
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { MONGOOSE_CONFIG } from './config/database.config';
import { OrganizationsModule } from './organizations/organizations.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AddressesModule } from './addresses/addresses.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'storage'), // Path to the directory where images are stored
      serveRoot: '/storage', // This will make images accessible under http://localhost:3000/storage
    }),
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
    OrganizationsModule,
    AddressesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
