import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../../common/interfaces';
import { CreateRoomDto } from './dto/create-room.dto';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getListRoom(@Req() req: AuthRequest) {
    return this.roomService.getListRoom(req.user.id);
  }

  @Get(':id')
  async getRoomDetailById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Post()
  async createRoom(@Req() req: AuthRequest, @Body() body: CreateRoomDto) {
    if (!body.memberIds.includes(req.user.id)) {
      body.memberIds.push(req.user.id);
    }
    return this.roomService.createRoom(body);
  }
}
