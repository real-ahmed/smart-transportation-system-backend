import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Organization } from 'src/organizations/organization.schema';

export type OrganizerDocument = Organizer & Document;

@Schema({ collection: 'organizers' })
export class Organizer {
  _id: any;
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user: User;
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
