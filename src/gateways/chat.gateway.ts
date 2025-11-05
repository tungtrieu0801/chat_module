import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../modules/message/message.service';
import { Message } from '../modules/message/message.schema';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    if (!roomId) return;
    client.join(roomId); // Socket.IO sẽ quản lý room
    this.logger.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Partial<Message>,
  ) {
    if (!payload?.roomId) return;
    const message = await this.messageService.sendMessage(payload);
    // Gửi đến tất cả client trong room
    this.server.to(payload.roomId).emit('receiveMessage', message);
  }

  @SubscribeMessage('reactMessage')
  async handleReactMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload?: {
      messageId: string;
      userId: string;
      emoji: string;
      roomId: string;
    },
  ) {
    if (!payload?.roomId) return;
    const updatedMessage = await this.messageService.reactToMessage(
      payload.messageId,
      payload.userId,
      payload.emoji,
    );
    this.server.to(payload.roomId).emit('updateReaction', updatedMessage);
  }

  @SubscribeMessage('pinMessage')
  async handlePinMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload?: { messageId: string; isPinned: boolean; roomId: string },
  ) {
    if (!payload?.roomId) return;
    const updatedMessage = await this.messageService.togglePin(
      payload.messageId,
      payload.isPinned,
    );
    this.server.to(payload.roomId).emit('updatePin', updatedMessage);
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload?: { messageId: string; roomId: string },
  ) {
    if (!payload?.roomId) return;
    await this.messageService.deleteMessage(payload.messageId);
    this.server.to(payload.roomId).emit('deleteMessage', payload.messageId);
  }
}
