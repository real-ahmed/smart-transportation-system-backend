import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Organization } from 'src/organizations/organization.schema';
import { Driver } from 'src/users/schemas/driver.schema';
import { Supervisor } from 'src/users/schemas/supervisor.schema';
import { Bus } from '../bus.schema';
export type MaintenanceDocument = Maintenance & Document;

@Schema({ collection: 'buses' })
export class Maintenance {
  @Prop({ type: Types.ObjectId, ref: 'Bus' })
  bus: Bus;

  @Prop({ required: true })
  maintenanceDate: Date;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
