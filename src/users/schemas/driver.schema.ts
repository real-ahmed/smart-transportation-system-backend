import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from './employee.schema';

export type DriverDocument = Driver & Document;

@Schema({ collection: 'drivers', timestamps: true }) // Enables createdAt & updatedAt
export class Driver {
  _id: any;

  @Prop({ required: true })
  licenseInfo: string;

  @Prop({ type: Date, required: true })
  licenseDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employee: Employee;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
