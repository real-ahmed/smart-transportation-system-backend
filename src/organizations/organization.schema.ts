import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from 'src/addresses/address.schema';
import { Organizer } from 'src/users/schemas/organizer.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrganizationDocument = Organization & Document;

@Schema({ collection: 'organizations' })
export class Organization {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  address: Address;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;
  private _id: any;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
