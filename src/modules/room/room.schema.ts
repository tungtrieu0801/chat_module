import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Room {

  @Prop({ name: 'room_single_id' })
  roomSingleId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ name: 'is_muted' })
  isMuted: boolean;

  @Prop({ name: 'is_group' })
  isGroup: boolean;

  @Prop({ type: [String], default: [], name: 'member_ids' })
  memberIds: string[];

  @Prop()
  lastMessage: string;

  @Prop()
  lastMessageAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  avatar: string;

  @Prop({ type: [String], default: [] })
  pinnedBy: string[];

  @Prop({ type: Map, of: Number, default: {} })
  unreadCounts: Map<string, number>;

  @Prop()
  status: string;
}

export const RoomShema = SchemaFactory.createForClass(Room);