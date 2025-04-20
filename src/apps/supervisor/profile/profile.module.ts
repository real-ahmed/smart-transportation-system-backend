import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [UsersModule],
})
export class ProfileModule {}
