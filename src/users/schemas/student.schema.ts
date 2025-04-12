import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type StudentDocument = Student & Document;

@Schema({ collection: 'students' })
export class Student {
  _id: any;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })


  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  member: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
