import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { BaseUser } from './base-user.schema';
import { Organizer } from './organizer.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends BaseUser {}

export const UserSchema = SchemaFactory.createForClass(User);
