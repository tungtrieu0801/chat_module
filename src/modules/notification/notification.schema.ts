import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Notification {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: null })
  content: string | null;

  @Prop({ type: String, default: null })
  type: string | null;

  @Prop({ type: Object, default: null })
  data: Record<string, any> | null;

  @Prop({ name: 'is_read', default: false })
  isRead: boolean;

  @Prop({ name: 'recipient_id', type: String, required: true })
  recipientId: string;

  // createdAt và updatedAt sẽ tự động do timestamps
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
