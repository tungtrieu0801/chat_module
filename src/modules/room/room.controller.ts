import { Controller, Get } from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ) {}

    @Get('getListRoom')
    public async getListRoom() {
        return await this.roomService.
    }
}