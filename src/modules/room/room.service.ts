import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    const partnerObjectIds = partnerIds.map((id) => new Types.ObjectId(id));

    const partners: UserDocument[] =
      partnerObjectIds.length > 0
        ? await this.userModel.find({ _id: { $in: partnerObjectIds } })
        : [];

    // Tạo map với key là string thay vì ObjectId
    const userMap = new Map(partners.map((u: UserDocument) => [u._id.toString(), u]));

    return rooms.map((r) => {
      let partner: UserDocument | null = null;

      if (!r.isGroup && r.memberIds.length === 2) {
        const partnerId = r.memberIds.find((_id) => _id !== userId);
        if (partnerId) {
          partner = userMap.get(partnerId) ?? null;
        }
      }

      return RoomMapper.toDto(r, partner);
    });


  }

  async getRoomByIdIfMember(roomId: string, userId: string): Promise<RoomDto> {
    const room: RoomDocument | null = (await this.roomModel
      .findOne({ _id: roomId, memberIds: userId })
      .exec());
    if (!room) {
      throw new ForbiddenException(
        'Bạn không có quyền xem phòng này hoặc phòng không tồn tại',
      );
    }

    if (!room.isGroup) {
      const partnerId = room.memberIds.find((_id) => _id !== userId);
      const partner = await this.userModel.findById(partnerId).lean();
      if (partner) {
        room.name = partner.fullname;
        room.avatar = partner.avatar;
      }
    }
    const roomDto: RoomDto = {
      id: room._id.toString(),
      roomSingleId: room.roomSingleId || '', // nếu có field này
      name: room.name || '',
      description: room.description || '',
      isGroup: room.isGroup,
      memberIds: room.memberIds.map((id) => id.toString()),
      lastMessage: room.lastMessage || '',
      lastMessageAt: room.lastMessageAt || new Date(0),
      createdBy: room.createdBy,
      avatar: room.avatar,
      pinnedBy: room.pinnedBy?.map((id) => id.toString()) || [],
      unreadCounts: room.unreadCounts || new Map<string, number>(),
      status: room.status || 'active',
      lastOnlineAt: Math.random() > 0.5
        ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
        : null,
    };

    return roomDto;
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
