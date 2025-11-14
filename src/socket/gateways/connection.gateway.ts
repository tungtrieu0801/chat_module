import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnlineUsersService } from '../socket-service/online-users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private onlineUsers: OnlineUsersService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) return client.disconnect();

    this.onlineUsers.add(userId, client.id);
    console.log(`🔌 User connected: ${userId}, socket=${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.onlineUsers.removeBySocketId(client.id);
    console.log(`❌ Disconnected: ${client.id}`);
  }
}
