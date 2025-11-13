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

  @SubscribeMessage(SOCKET_EVENTS.EMIT.ROOM.JOIN)
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

  @SubscribeMessage(SOCKET_EVENTS.EMIT.MESSAGE.SEND)
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageRequestDto,
  ): void {
    console.log('💬 Message received from client:', );
    const sendData = {
      ...data,
      content: `server said: ${data.content}`, // prefix server
    };

    setTimeout(() => {
      this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.RECEIVE, data);
    }, 1000);
  }

  // @SubscribeMessage(SOCKET_EVENTS.MESSAGE.TYPING)
  // handleTyping(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() data: { roomId: string, userId: string, isTyping: boolean }
  // ) {
  //   // Phát lại cho tất cả user trong room, trừ sender
  //   client.to(data.roomId).emit(SOCKET_EVENTS.MESSAGE.TYPING, data);
  // }

  @SubscribeMessage(SOCKET_EVENTS.ON.MESSAGE.REACTED)
  handleMessageReacted(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string, messageId: string, userId: string, reaction: string }
  ): void {
    console.log('👍 Message reacted:', data);

    // Phát lại cho tất cả user trong room, bao gồm sender
    this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.REACTED, data);
  }

}
