import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FriendshipDocument = HydratedDocument<Friendship>;

@Schema({ timestamps: true })
export class Friendship {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requester: Types.ObjectId; // Người gửi lời mời

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiver: Types.ObjectId; // Người nhận lời mời

  @Prop({
    type: String,
    enum: ['pending', 'accepted', 'blocked', 'rejected'],
    default: 'pending',
  })
  status: string; // Trạng thái quan hệ
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
