﻿import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from 'src/users/enums/user-status.enum';
import { User } from './user.schema';
import { BaseUser } from './base-user.schema';
import { Organization } from 'src/organizations/organization.schema';

export type EmployeeDocument = Employee & Document;

@Schema({ collection: 'employees' })
export class Employee extends BaseUser {
  _id: any;
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
