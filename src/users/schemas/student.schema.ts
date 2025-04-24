import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Address } from 'src/addresses/address.schema';

export type StudentDocument = Student & Document;

@Schema({ collection: 'students' })
export class Student {
  _id: any;

  @Prop({ required: true })
  image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  disabilities: string[];

  @Prop({ type: String, required: true })
  ssn: string;

  @Prop({ type: Types.ObjectId, ref: 'Member', required: false })
  guardian: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Member', default: [], required: false })
  followers: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  address: Address;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
