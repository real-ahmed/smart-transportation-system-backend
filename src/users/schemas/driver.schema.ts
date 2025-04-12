import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from './employee.schema';
import { Organization } from 'src/organizations/organization.schema';

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

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
