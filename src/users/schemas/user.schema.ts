import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { BaseUser } from './base-user.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends BaseUser {
  @Prop({ type: Types.ObjectId, ref: 'Admin', default: null })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Member', default: null })
  member: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organizer', default: null })
  organizer: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
