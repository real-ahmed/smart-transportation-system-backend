import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseUser } from 'src/users/schemas/base-user.schema';

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

  @Prop({ type: Object, ref: 'BaseUser', required: true })
  owner: BaseUser;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
