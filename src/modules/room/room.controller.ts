import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { Room } from "./room.schema";

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

    @Post('create')
    async createRoom(@Body() body: Partial<Room>) {
    return await this.roomService.createRoom(body);
  }
}