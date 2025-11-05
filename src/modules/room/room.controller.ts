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
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getListRoom(@Req() req: AuthRequest) {
    return this.roomService.getListRoom(req.user.sub);
  }

  @Get(':id')
  async getRoomDetailById(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.roomService.getRoomByIdIfMember(id, req.user.sub);
  }

  @Post()
  async createRoom(@Req() req: AuthRequest, @Body() body: CreateRoomDto) {
    if (!body.memberIds.includes(req.user.sub)) {
      body.memberIds.push(req.user.sub);
    }
    return this.roomService.createRoom(body);
  }
}
