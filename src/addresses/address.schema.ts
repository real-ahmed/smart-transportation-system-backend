import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ collection: 'addresses' })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  postalCode: string;
  _id: any;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
