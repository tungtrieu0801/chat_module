import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../../common/constants/socket.constant';
import { OnlineUsersService } from '../socket-service/online-users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class CallGateway {
  @WebSocketServer()
  server: Server;

  constructor(private onlineUsers: OnlineUsersService) {}

  @SubscribeMessage(SOCKET_EVENTS.EMIT.CALL.OFFER)
  handleOffer(@ConnectedSocket() client: Socket, @MessageBody() data) {
    const socketId = this.onlineUsers.getSocketId(data.toUserId);
    if (socketId)
      this.server.to(socketId).emit(SOCKET_EVENTS.ON.CALL.OFFER, {
        fromUserId: client.id,
        sdp: data.sdp,
      });
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.CALL.ANSWER)
  handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() data) {
    this.server.to(data.toUserId).emit(SOCKET_EVENTS.ON.CALL.ANSWER, {
      fromUserId: client.id,
      sdp: data.sdp,
    });
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.CALL.ICE)
  handleIce(@ConnectedSocket() client: Socket, @MessageBody() data) {
    this.server.to(data.toUserId).emit(SOCKET_EVENTS.ON.CALL.ICE, {
      fromUserId: client.id,
      candidate: data.candidate,
    });
  }

  @SubscribeMessage(SOCKET_EVENTS.EMIT.CALL.HANGUP)
  handleHangup(@ConnectedSocket() client: Socket, @MessageBody() data) {
    this.server.to(data.toUserId).emit(SOCKET_EVENTS.ON.CALL.HANGUP, {
      fromUserId: client.id,
    });
  }
}
