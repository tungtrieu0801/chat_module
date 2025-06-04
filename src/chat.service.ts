import { Injectable } from "@nestjs/common";
import { RoomRepository } from "./modules/room/room.reporsitory";

@Injectable()
export class ChatService {
    constructor(
        private readonly roomRepository: RoomRepository,
    ) {}

    
}