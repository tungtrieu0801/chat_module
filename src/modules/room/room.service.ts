import { Injectable } from "@nestjs/common";
import { RoomRepository } from "./room.reporsitory";
import { Room } from "./room.entity";

@Injectable()
export class RoomService {
    constructor(
        private readonly roomRepository: RoomRepository,
    ) {}

    public async createRoom(data: Partial<Room>): Promise<Room> {
        const newRoom = this.roomRepository.create(data);
        return await this.roomRepository.save(newRoom);
    }

    public async checkRoomExists(roomId: string): Promise<boolean>{
        return await this.roomRepository.existsBy({ id: roomId });
    }

    //Create a unique room ID for single chat rooms
    public generateSingleRoomId(firstUserId: string, secondUserId: string): string {
        const sortedIds = [firstUserId, secondUserId].sort();
        return `${sortedIds[0]}-${sortedIds[1]}`;
    }
}