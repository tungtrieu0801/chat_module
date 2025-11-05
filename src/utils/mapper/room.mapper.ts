import { Room, RoomDocument } from '../../modules/room/room.schema';
import { RoomDto } from '../../modules/room/dto/room.dto';

export class RoomMapper {
  static toDto(room: RoomDocument, partner?: any): RoomDto {
    return {
      id: room._id.toString(),
      roomSingleId: room.roomSingleId ?? '',
      name: room.isGroup ? room.name : partner?.name || 'Unknown',
      description: room.description ?? '',
      isGroup: room.isGroup,
      memberIds: room.memberIds,
      lastMessage: room.lastMessage ?? '',
      lastMessageAt: room.lastMessageAt ?? new Date(),
      createdBy: room.createdBy ?? '',
      avatar: room.isGroup
        ? (room.avatar ?? null)
        : (partner?.avatar ?? null),
      pinnedBy: room.pinnedBy ?? [],
      unreadCounts: new Map(Object.entries(room.unreadCounts ?? {})),
      status: room.status ?? 'active',
    };
  }
}
