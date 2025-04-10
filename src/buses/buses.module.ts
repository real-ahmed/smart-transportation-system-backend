import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { Bus, BusSchema } from './bus.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BusesGateway } from './buses.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }])],
  providers: [BusesService, BusesGateway],
  exports: [BusesService],

})
export class BusesModule { }
