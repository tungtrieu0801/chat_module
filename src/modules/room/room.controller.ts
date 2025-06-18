import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ) {}

    @Get('getListRoom')
    @UseGuards(JwtAuthGuard)
    public async getListRoom(@Req() req) {
        const userId = req.user.id;
        return await this.roomService.getListRoom(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getRoomDetailById(@Param('id') id: string) {
        return await this.roomService.getRoomById(id);
    }
}