import { Room, RoomDocument } from '../../modules/room/room.schema';
import { RoomDto } from '../../modules/room/dto/room.dto';

export class RoomMapper {
  static toDto(room: RoomDocument, partner?: any): RoomDto {
    return {
      id: room._id.toString(),
      roomSingleId: room.roomSingleId ?? '',
      name: room.isGroup
        ? room.name
        : partner?._doc.fullname || 'Unknown',
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
      lastOnlineAt: room.isGroup ? null : Math.random() > 0.5
        ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)) // trong 7 ngày gần đây
        : null,
    };
  }
}
