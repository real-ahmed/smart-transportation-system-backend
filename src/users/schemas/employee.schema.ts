import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from 'src/users/enums/user-status.enum';
import { User } from './user.schema';
import { BaseUser } from './base-user.schema';

export type EmployeeDocument = Employee & Document;

@Schema({ collection: 'employees' })
export class Employee extends BaseUser {
  @Prop({ required: true })
  organization: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', default: null })
  driver: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Supervisor', default: null })
  supervisor: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
