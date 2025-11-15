import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../../common/constants/socket.constant';
import { ReactDto } from '../dto/react.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SOCKET_EVENTS.EMIT.ROOM.JOIN)
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    console.log(`user ${client.id} join room`)
    client.join(data.roomId);
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.MESSAGE.SEND)
  handleSendMessage(@MessageBody() data) {
    setTimeout(() => {
      this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.RECEIVE, data);
    }, 700);
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.MESSAGE.REACT)
  handleMessageReacted(@MessageBody() data: ReactDto): void {
    console.log('data', data);
    this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.REACTED, data);
  }
}
