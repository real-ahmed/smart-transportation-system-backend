import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from 'src/addresses/address.schema';
import { Bus } from 'src/buses/bus.schema';
import { Driver } from 'src/users/schemas/driver.schema';
import { Student } from 'src/users/schemas/student.schema';
import { Supervisor } from 'src/users/schemas/supervisor.schema';
import { Organizer } from 'src/users/schemas/organizer.schema';
import { Organization } from 'src/organizations/organization.schema';

export type TripDocument = Trip & Document;

@Schema({ collection: 'trips' })
export class Trip {
  _id: any;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  startTime: Date;
  @Prop({ required: true })
  endTime: Date;
  @Prop({ type: Types.ObjectId, ref: 'Bus', required: true })
  bus: Bus;
  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driver: Driver;
  @Prop({ type: Types.ObjectId, ref: 'Supervisor', required: true })
  supervisor: Supervisor;
  @Prop({ type: [Types.ObjectId], ref: 'Student', required: true })
  students: Student[];
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;
}
export const TripSchema = SchemaFactory.createForClass(Trip);
