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
import { MessageService } from '../../modules/message/message.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {

  constructor(
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SOCKET_EVENTS.EMIT.ROOM.JOIN)
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    console.log(`user ${client.id} join room`)
    client.join(data.roomId);
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.MESSAGE.SEND)
  async handleSendMessage(@MessageBody() data): Promise<void> {
    try {
      const dataResponse  = await this.messageService.saveMessage(data);
      this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.RECEIVE, dataResponse);
      console.log(dataResponse);
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.MESSAGE.REACT)
  handleMessageReacted(@MessageBody() data: ReactDto): void {
    console.log('data', data);
    this.server.to(data.roomId).emit(SOCKET_EVENTS.ON.MESSAGE.REACTED, data);
  }
}
