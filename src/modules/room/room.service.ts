import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const rooms: RoomDocument[] = await this.roomModel.find({
      memberIds: userId,
    });
    const singleRooms: RoomDocument[] = rooms.filter(
      (r: RoomDocument): boolean => !r.isGroup && r.memberIds.length === 2,
    );

    // Get list ID partner in single room
    const partnerIds = singleRooms
      .map((r: RoomDocument) =>
        r.memberIds.find((id: string): boolean => id !== userId),
      )
      .filter(Boolean) as string[];

    // Get all information partners
    const partners: UserDocument[] =
      partnerIds.length > 0
        ? await this.userModel.find({ id: { $in: partnerIds } })
        : [];

    const userMap = new Map(partners.map((u: UserDocument) => [u.id, u]));

    // Return mapped rooms
    return rooms.map((r) => {
      const partnerId = r.memberIds.find((id) => id !== userId);
      const partner = partnerId ? userMap.get(partnerId) : null;
      return RoomMapper.toDto(r, partner);
    });
  }

  async getRoomByIdIfMember(roomId: string, userId: string): Promise<Room> {
    const room: Room | null = (await this.roomModel
      .findOne({ _id: roomId, memberIds: userId })
      .lean()) as Room | null;
    if (!room) {
      throw new ForbiddenException(
        'Bạn không có quyền xem phòng này hoặc phòng không tồn tại',
      );
    }
    return room;
  }

  async createRoom(data: Partial<Room>): Promise<RoomDocument> {
    if (!data.isGroup && data.memberIds?.length === 2) {
      const singleRoomId = this.generateSingleRoomId(
        data.memberIds[0],
        data.memberIds[1],
      );
      const existingRoom = await this.roomModel.findOne({
        roomSingleId: singleRoomId,
      });
      if (existingRoom) {
        return existingRoom;
      }
      data.roomSingleId = singleRoomId;
    }
    return await this.roomModel.create(data);
  }

  generateSingleRoomId(firstUserId: string, secondUserId: string): string {
    return [firstUserId, secondUserId].sort().join('-');
  }
}
