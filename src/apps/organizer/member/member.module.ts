import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [UsersModule, OrganizationsModule, MembershipsModule],
})
export class MemberModule {}
