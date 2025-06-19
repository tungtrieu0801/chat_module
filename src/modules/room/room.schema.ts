import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Room {

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop({ name: 'is_muted' })
  isMuted: boolean;

  @Prop({ name: 'is_group' })
  isGroup: boolean;

  @Prop({ type: [String], default: [], name: 'member_ids' })
  memberIds: string[];
}

export const RoomShema = SchemaFactory.createForClass(Room);