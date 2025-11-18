import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { RedisService } from '../../redis/redis.service';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly redisService: RedisService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  // Lấy danh sách message theo room, hỗ trợ phân trang
  async getMessagesByRoom(
    roomId: string,
    page = 1,
    limit = 20,
  ): Promise<Message[]> {
    const messages = await this.messageModel
      .find({ roomId, isDeleted: false })
      .sort({ created_at: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get list userIds from 20 messages
    const userIds = Array.from(new Set(messages.map(msg => msg.senderId)));

    const usersMap: Record<string, any> = {};

    // Get information from redis
    const redisResults = await this.redisService.mget(
      userIds.map(id => `user:${id}`),
    );

    const missingUserIds: string[] = [];
    redisResults.forEach((u, idx) => {
      if (u) {
        usersMap[userIds[idx]] = u;
      } else {
        missingUserIds.push(userIds[idx]);
      }
    });

    // Get information from DB for missing users
    if (missingUserIds.length >0) {
      const usersFromDb = await this.userModel
        .find({ _id: { $in: missingUserIds } })
        .select('_id fullname avatar')
        .lean();
      usersFromDb.forEach((user => {
        usersMap[user._id.toString()] = user;
      }));

      // Set to redis for future requests
      const pipeline = this.redisService.pipeline();
      usersFromDb.forEach(user => {
        pipeline.set(`user:${user._id}`, JSON.stringify({
          _id: user._id,
          fullname: user.fullname,
          avatar: user.avatar,
        }), 'EX', 36000);
      });
      await pipeline.exec();
    }

    // Map user information to message
    const messagesWithUser = messages.map(msg => ({
      ...msg,
      user: usersMap[msg.senderId] || null,
    }));

    return messagesWithUser.reverse();
  }

  // Gửi message mới
  async saveMessage(data: Partial<Message>): Promise<MessageDocument> {
    return this.messageModel.create(data);
  }

  // Thêm reaction vào message
  async reactToMessage(
    messageId: string,
    userId: string,
    emoji: string,
  ): Promise<void> {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new NotFoundException('Message not found');

    message.reactions.push({ userId, emoji });
    await message.save();
  }

  // Pin / unpin message
  async togglePin(messageId: string, isPinned: boolean): Promise<void> {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new NotFoundException('Message not found');

    message.isPinned = isPinned;
    await message.save();
  }

  // Xoá message (soft delete)
  async deleteMessage(messageId: string): Promise<void> {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new NotFoundException('Message not found');

    message.isDeleted = true;
    await message.save();
  }
}
