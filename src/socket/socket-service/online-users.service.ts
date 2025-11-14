import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineUsersService {
  private users: Map<string, string> = new Map<string, string>();

  add(userId: string, socketId: string) {
    this.users.set(userId, socketId);
  }

  removeBySocketId(socketId: string) {
    for (const [uId, sId] of this.users.entries()) {
      if (sId === socketId) {
        this.users.delete(uId);
        break;
      }
    }
  }

  getSocketId(userId: string) {
    return this.users.get(userId);
  }
}
