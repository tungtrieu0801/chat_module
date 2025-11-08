import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: Partial<User>) {
    return this.userService.create(data);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('details')
  async findById(@Req() req: AuthRequest) {
    return this.userService.findById(req.user.sub);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // ---------------------------
  // 👇 Các API liên quan đến bạn bè
  // ---------------------------

  @Post(':id/friends/:friendId')
  async addFriend(
    @Param('id') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return this.userService.addFriend(userId, friendId);
  }

  @Delete(':id/friends/:friendId')
  async removeFriend(
    @Param('id') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return this.userService.removeFriend(userId, friendId);
  }

  @Get(':id/friends')
  async getFriends(@Param('id') userId: string) {
    return this.userService.getFriends(userId);
  }
}
