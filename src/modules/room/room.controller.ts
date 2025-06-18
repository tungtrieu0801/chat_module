import { Controller, Get, UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ) {}

    @Get('getListRoom')
    @UseGuards(JwtAuthGuard)
    public async getListRoom() {
        return await this.roomService.getListRoom();
    }
}