import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from './employee.schema';

export type SupervisorDocument = Supervisor & Document;

@Schema({ collection: 'supervisor', timestamps: true }) // Enables createdAt & updatedAt
export class Supervisor {
  _id: any;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employee: Employee;
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor);
