import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: Partial<User>) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
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
