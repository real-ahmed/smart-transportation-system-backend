import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Admin', default: null })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Member', default: null })
  member: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organizer', default: null })
  organizer: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
