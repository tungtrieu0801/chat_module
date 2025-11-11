import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép Flutter truy cập
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

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { roomId: string }) {
    console.log('📩 Join room:', data);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(@MessageBody() data: any) {
    console.log('💬 Message received from client:', data);
    this.server.emit('receiveMessage', data);
  }
}
