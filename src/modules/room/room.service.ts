import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { RoomDto } from './dto/room.dto';
import { RoomMapper } from '../../utils/mapper/room.mapper';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>) {}

  async getListRoom(userId: string): Promise<RoomDto[]> {
    const rooms = await this.roomModel.find({ memberIds: userId }).lean();

    const singleRooms = rooms.filter((r) => !r.isGroup && r.memberIds.length === 2);
    const partnerIds = singleRooms
      .map((r) => r.memberIds.find((id) => id !== userId))
      .filter(Boolean);

    const userMap = new Map();

    return rooms.map((r) => {
      const partnerId = r.memberIds.find((id) => id !== userId);
      return RoomMapper.toDto(r as any as Room, userMap.get(partnerId));
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
