import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../common/constants/socket.constant';
import { Message } from '../modules/message/message.schema';
import { MessageRequestDto } from '../modules/message/dto/message.request.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('✅ Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('❌ Client disconnected:', client.id);
  }

  @SubscribeMessage(SOCKET_EVENTS.ROOM.JOIN)
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ): void {
    try {
      client.join(data.roomId);
      console.log('📩 Joined room:', data.roomId);
    } catch (err) {
      console.error('❌ Failed to join room:', err.message);
    }
  }


  @SubscribeMessage(SOCKET_EVENTS.MESSAGE.SEND)
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageRequestDto,
  ): void {
    console.log('💬 Message received from client:', data);

    // Tạo object mới, thêm "server said" vào content
    const sendData = {
      ...data,
      content: `server said: ${data.content}`, // prefix server
    };

    setTimeout(() => {
      this.server.to(data.roomId).emit(SOCKET_EVENTS.MESSAGE.RECEIVE, sendData);
    }, 1000);
  }

}
