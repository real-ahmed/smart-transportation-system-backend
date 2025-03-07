import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { UsersModule } from 'src/users/users.module';

@Module({  imports: [
    UsersModule,
    OrganizationsModule,
    AddressesModule,
    OrganizationModule,
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
