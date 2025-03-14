import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Employee } from './employee.schema';

export type DriverDocument = Driver & Document;

@Schema({ collection: 'drivers' })
export class Driver extends Employee {}

export const DriverSchema = SchemaFactory.createForClass(Driver);
