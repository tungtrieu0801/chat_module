import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { HydratedDocument } from 'mongoose';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
  STICKER = 'sticker',
  OTHER = 'other',
}
export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Message {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ type: String, enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Prop()
  content: string;

  // Metadata for files, stickers, etc.
  @Prop({ type: Object, default: null })
  metadata: Record<string, any> | null;

  @Prop({ name: 'room_id' })
  roomId: string;

  @Prop({
    type: [
      {
        userId: String,
        emoji: String,
      },
    ],
    default: [],
  })
  reactions: Array<{
    userId: string;
    emoji: string;
  }>;

  @Prop({ type: [String], default: [] })
  mentionedUserIds: string[];

  @Prop({ name: 'is_pinned', default: false })
  isPinned: boolean;

  @Prop({ name: 'is_edited', default: false })
  isEdited: boolean;

  @Prop({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Prop()
  senderId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
