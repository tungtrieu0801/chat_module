import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('message')
handleMessage(
  @MessageBody() message: any,
  @ConnectedSocket() client: Socket,
) {
  console.log('Received message:', message);

  this.server.emit('message', {
    from: 'server',
    data: message,
  });
  }
}
