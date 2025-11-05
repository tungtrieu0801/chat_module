export interface RoomDto {
  id: string;
  roomSingleId: string;
  name: string;
  description: string;
  isGroup: boolean;
  memberIds: string[];
  lastMessage: string;
  lastMessageAt: Date;
  createdBy: string;
  avatar: string | null;
  pinnedBy: string[];
  unreadCounts: Map<string, number>;
  status: string;
}
