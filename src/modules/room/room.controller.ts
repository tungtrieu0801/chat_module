import { Controller, Get, Param, UseGuards } from "@nestjs/common";
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

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getRoomDetailById(@Param('id') id: string) {
        return await this.roomService.
    }
}