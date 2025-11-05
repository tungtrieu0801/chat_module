import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Room {

  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean, name: 'is_group' })
  isGroup: boolean;

  @Prop({ type: [String], default: [], name: 'member_ids' })
  memberIds: string[];

  @Prop({ type: String })
  lastMessage: string;

  @Prop({ type: Date })
  lastMessageAt: Date;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: [String], default: [] })
  pinnedBy: string[];

  @Prop({ type: Map, of: Number, default: {} })
  unreadCounts: Map<string, number>;

  @Prop({ type: String })
  status: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
