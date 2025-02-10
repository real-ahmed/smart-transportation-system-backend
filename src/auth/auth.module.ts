import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { BaseAuthProvider } from './providers/base-auth.provider';
import { UserAuthProvider } from './providers/user-auth.provider';
import { EmployeeAuthProvider } from './providers/employee-auth.provider';
import { JWT_CONFIG } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.registerAsync(JWT_CONFIG)],
  providers: [AuthService, UserAuthProvider, EmployeeAuthProvider],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
