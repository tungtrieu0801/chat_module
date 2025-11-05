import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { RoomDto } from './dto/room.dto';
import { RoomMapper } from '../../utils/mapper/room.mapper';
import { User, UserDocument } from '../user/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getListRoom(userId: string): Promise<RoomDto[]> {
    // 🔹 Lấy tất cả các phòng mà user này là thành viên
    const rooms = await this.roomModel.find({ memberIds: userId }).lean();

    // 🔹 Lọc ra các phòng 1-1 (không phải group, chỉ có 2 thành viên)
    const singleRooms = rooms.filter(
      (r) => !r.isGroup && r.memberIds.length === 2,
    );

    // 🔹 Lấy danh sách ID của người còn lại trong phòng
    const partnerIds = singleRooms
      .map((r) => r.memberIds.find((id) => id && id !== userId))
      .filter(Boolean);

    // 🔹 Lấy thông tin các user đối tác 1 lần (tránh query lặp)
    const partners =
      partnerIds.length > 0
        ? await this.userModel.find({ id: { $in: partnerIds } }).lean()
        : [];

    const userMap = new Map(partners.map((u) => [u.id, u]));

    // 🔹 Trả về danh sách room DTO (có cả thông tin partner nếu là room 1-1)
    return rooms.map((r) => {
      const partnerId = r.memberIds.find((id) => id && id !== userId);
      const partner = partnerId ? userMap.get(partnerId) : null;
      return RoomMapper.toDto(r as any as Room, partner);
    });
  }


  async getRoomById(id: string): Promise<RoomDocument | null> {
    return this.roomModel.findById(id);
  }

  async createRoom(data: Partial<Room>): Promise<RoomDocument> {
    return await this.roomModel.create(data);
  }

  async checkRoomExists(roomId: string): Promise<boolean> {
    return !!(await this.roomModel.exists({ roomSingleId: roomId }));
  }

  generateSingleRoomId(firstUserId: string, secondUserId: string): string {
    return [firstUserId, secondUserId].sort().join('-');
  }
}
