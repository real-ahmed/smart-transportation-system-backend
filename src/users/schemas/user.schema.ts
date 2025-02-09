import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { Document, Types } from 'mongoose';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserStatus ,default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ type: Types.ObjectId, ref: 'Admin', default: null })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Member', default: null })
  member: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organizer', default: null })
  organizer: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
