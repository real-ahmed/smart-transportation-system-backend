import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ collection: 'employees' })
export class Employee {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  org_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', default: null })
  driver: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Supervisor', default: null })
  supervisor: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
