import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketEmitterService {
  private server: Server;
  // Map<userId, socketId[]> contains all sockets of user
  private userSockets = new Map<string, string[]>();
  setServer(server: Server) {
    this.server = server;
  }

  // Save to map userId and socketId, push userId to friend when online
  registerUser(userId: string, socketId: string) {
    const sockets = this.userSockets.get(userId) || [];
    this.userSockets.set(userId, [...sockets, socketId]);
    this.server.emit('system:notify:all', {
      userId, // userId of user online
    });
  }

  // Emit tới tất cả socket của user
  emitToUser(userId: string, event: string, data: any) {
    if (!this.server) return;
    const sockets = this.userSockets.get(userId);
    if (!sockets) return;
    for (const socketId of sockets) {
      this.server.to(socketId).emit(event, data);
    }
  }

  unregisterUser(userId: string, socketId: string) {
    const sockets = this.userSockets.get(userId);
    if (!sockets) return;
    const updated = sockets.filter((id) => id !== socketId);
    if (updated.length === 0) this.userSockets.delete(userId);
    else this.userSockets.set(userId, updated);
  }

  // Emit tới room
  emitToRoom(roomId: string, event: string, data: any) {
    if (!this.server) return;
    this.server.to(roomId).emit(event, data);
  }
}
