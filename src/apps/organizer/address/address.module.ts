import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
  imports: [AddressesModule],
  exports: [AddressService],
})
export class AddressModule {}
