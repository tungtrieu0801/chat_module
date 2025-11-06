import { Controller, Post, Param, Get, UseGuards, Req } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendshipController {
  constructor(private readonly friendService: FriendshipService) {}

  @Post('request/:receiverId')
  sendRequest(
    @Param('receiverId') receiverId: string,
    @Req() req: AuthRequest,
  ) {
    const requesterId = req.user.sub; // ✅ Lấy từ JWT payload
    return this.friendService.sendFriendRequest(requesterId, receiverId);
  }

  @Post('accept/:requesterId')
  accept(@Param('requesterId') requesterId: string, @Req() req: AuthRequest) {
    const receiverId = req.user.sub;
    return this.friendService.acceptFriendRequest(requesterId, receiverId);
  }

  @Get()
  getFriends(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    return this.friendService.getFriends(userId);
  }

  @Get('pending')
  getPending(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    return this.friendService.getPendingRequests(userId);
  }
}
