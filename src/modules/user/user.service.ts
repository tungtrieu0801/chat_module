import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { MongoServerError } from 'mongodb';
import { UserDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 📌 Tạo user mới
  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    try {
      return await user.save();
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // 📌 Lấy danh sách user
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true, // chỉ lấy @Expose
    });
  }

  // 📌 Cập nhật user
  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 📌 Xóa user
  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ id });
    if (result.deletedCount === 0)
      throw new NotFoundException('User not found');
  }

  // 📌 Thêm bạn bè (2 chiều)
  async addFriend(userId: string, friendId: string) {
    await this.userModel.updateOne(
      { id: userId },
      { $addToSet: { friends: friendId } },
    );
    await this.userModel.updateOne(
      { id: friendId },
      { $addToSet: { friends: userId } },
    );
    return { message: 'Friend added successfully' };
  }

  // 📌 Xóa bạn bè (2 chiều)
  async removeFriend(userId: string, friendId: string) {
    await this.userModel.updateOne(
      { id: userId },
      { $pull: { friends: friendId } },
    );
    await this.userModel.updateOne(
      { id: friendId },
      { $pull: { friends: userId } },
    );
    return { message: 'Friend removed successfully' };
  }

  // 📌 Lấy danh sách bạn bè
  async getFriends(userId: string): Promise<User[]> {
    const user = await this.findById(userId);
    if (!user.friends || user.friends.length === 0) return [];
    return this.userModel.find({ id: { $in: user.friends } }).lean();
  }

  async findOne(condition: any): Promise<UserDocument | null> {
    return this.userModel.findOne(condition).exec();
  }
}
