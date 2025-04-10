import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Organization } from 'src/organizations/organization.schema';
import { Driver } from 'src/users/schemas/driver.schema';
import { Supervisor } from 'src/users/schemas/supervisor.schema';
export type BusDocument = Bus & Document;

@Schema({ collection: 'buses' })
export class Bus {

    @Prop({ required: true })
    registrationPlate: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'Driver' })
    driver: Driver;

    @Prop({ type: Types.ObjectId, ref: 'Supervisor' })
    supervisor: Supervisor;

    @Prop({ type: Types.ObjectId, ref: 'Organization' })
    organization: Organization;

    @Prop({ type: [{ latitude: Number, longitude: Number, timestamp: Date }], default: [] })
    locationHistory: {
        latitude: number;
        longitude: number;
        timestamp: Date;
    }[];

}

export const BusSchema = SchemaFactory.createForClass(Bus);
