import { Module } from '@nestjs/common';
import { TripController } from './trip/trip.controller';
import { TripModule } from './trip/trip.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [TripController],
  imports: [
    TripModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'supervisor',
      },
    ]),
  ],
})
export class SupervisorModule { }
