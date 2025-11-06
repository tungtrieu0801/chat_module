import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friendship } from './schema/friendship.schema';
import { User } from '../user/user.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel(Friendship.name)
    private friendshipModel: Model<Friendship>,

    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async sendFriendRequest(requesterId: string, receiverId: string) {
    if (requesterId === receiverId) {
      throw new BadRequestException(
        'Không thể tự gửi lời mời kết bạn cho chính mình',
      );
    }

    const existing = await this.friendshipModel.findOne({
      $or: [
        { requester: requesterId, receiver: receiverId },
        { requester: receiverId, receiver: requesterId },
      ],
    });

    if (existing)
      throw new BadRequestException('Lời mời đã tồn tại hoặc đã là bạn bè');

    return this.friendshipModel.create({
      requester: requesterId,
      receiver: receiverId,
      status: 'pending',
    });
  }

  async acceptFriendRequest(requestId: string, receiverId: string) {
    const friendship = await this.friendshipModel.findOne({
      _id: requestId,
      receiver: receiverId,
      status: 'pending',
    });

    if (!friendship) {
      return { message: 'Không tìm thấy yêu cầu kết bạn để chấp nhận' };
    }

    friendship.status = 'accepted';
    await friendship.save();

    // Cập nhật vào danh sách bạn bè
    await this.userModel.updateOne(
      { _id: friendship.requester },
      { $addToSet: { friends: friendship.receiver } },
    );
    await this.userModel.updateOne(
      { _id: friendship.receiver },
      { $addToSet: { friends: friendship.requester } },
    );

    return { message: 'Kết bạn thành công' };
  }

  async rejectFriendRequest(requesterId: string, receiverId: string) {
    return this.friendshipModel.findOneAndUpdate(
      { requester: requesterId, receiver: receiverId, status: 'pending' },
      { status: 'rejected' },
      { new: true },
    );
  }

  async getFriends(userId: string) {
    return this.friendshipModel.find({
      $or: [
        { requester: userId, status: 'accepted' },
        { receiver: userId, status: 'accepted' },
      ],
    });
  }

  async getPendingRequests(userId: string) {
    return this.friendshipModel.find({
      receiver: userId,
      status: 'pending',
    });
  }
}
