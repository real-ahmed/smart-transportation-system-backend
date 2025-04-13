import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
    INFO = 'info',
    WARNING = 'warning',
    ALERT = 'alert',
    MAINTENANCE = 'maintenance',
    TRIP = 'trip',
    SYSTEM = 'system',
}

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string;

    @Prop({
        type: String,
        enum: Object.values(NotificationType),
        default: NotificationType.INFO,
    })
    type: NotificationType;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization' })
    organizationId: string;

    @Prop({ default: false })
    isRead: boolean;

    @Prop({ type: MongooseSchema.Types.Mixed })
    data: Record<string, any>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification); 