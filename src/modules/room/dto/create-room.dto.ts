export class CreateRoomDto {
  name?: string;
  memberIds: string[];
  isGroup?: boolean;
}
