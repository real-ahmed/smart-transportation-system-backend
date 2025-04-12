import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type MemberDocument = Member & Document;

@Schema({ collection: 'members' })
export class Member {
  _id: any;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
  @Prop({ type: [Types.ObjectId], ref: 'Organization', default: [] })
  organizations: Types.ObjectId[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
