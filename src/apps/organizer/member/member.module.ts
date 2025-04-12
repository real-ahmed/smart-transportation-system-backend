import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UsersModule } from 'src/users/users.module';
@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [UsersModule],
})
export class MemberModule { }
