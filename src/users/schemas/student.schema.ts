import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

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


  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  guardian: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Member', default: [] })
  followers: Types.ObjectId[];

}

export const StudentSchema = SchemaFactory.createForClass(Student);
