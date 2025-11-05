import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  // Lấy danh sách message theo room, hỗ trợ phân trang
  async getMessagesByRoom(
    roomId: string,
    page = 1,
    limit = 20,
  ): Promise<Message[]> {
    return this.messageModel
      .find({ roomId, isDeleted: false })
      .sort({ created_at: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  // Gửi message mới
  async sendMessage(data: Partial<Message>): Promise<MessageDocument> {
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
