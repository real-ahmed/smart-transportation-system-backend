import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from 'src/addresses/address.schema';
import { Bus } from 'src/buses/bus.schema';
import { Driver } from 'src/users/schemas/driver.schema';
import { Student } from 'src/users/schemas/student.schema';
import { Supervisor } from 'src/users/schemas/supervisor.schema';
import { Organizer } from 'src/users/schemas/organizer.schema';
import { Organization } from 'src/organizations/organization.schema';
import { Member } from 'src/users/schemas/member.schema';

export type MembershipRequestDocument = MembershipRequest & Document;

@Schema({ collection: 'membershipRequests' })
export class MembershipRequest {
  _id: any;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Organization;

  @Prop({ required: true })
  studentImage: string;

  @Prop({ type: String, required: true })
  studentName: string;

  @Prop({ type: [String], default: [] })
  studentDisabilities: string[];

  @Prop({ type: String, required: true })
  studentSsn: string;

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

  @Prop({ type: Types.ObjectId, ref: 'Member', required: false })
  member: Member;

  status: string; // 'pending', 'approved', 'rejected'
}
export const MembershipRequestSchema =
  SchemaFactory.createForClass(MembershipRequest);
