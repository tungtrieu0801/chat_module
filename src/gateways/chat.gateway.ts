import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketMiddleware } from 'src/middleware/socket.middleware';
import { RoomService } from 'src/modules/room/room.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly roomService: RoomService) {}
  @WebSocketServer()
  server: Server;

  afterInit() {
    this.server.use(socketMiddleware('jwt'));
  }

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token as string;
    console.log('token received:', token);
    console.log('username: ', (client as any).username);

    // const userId = client.handshake.query.userId as string;
    // this.server.to(client.id).emit(userId.toString(), {
    //   from: 'server',
    //   data: `Welcome user ${userId}`,
    // });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Client joining room:', roomId, 'from:', client.id);
    client.join(roomId);
    this.server.to(client.id).emit('joinedRoom', {
      roomId: roomId,
      message: `You have joined room ${roomId}`,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message from user:', (client as any).userId, message);

    // roomtype 1 is for single chat, 2 is for group chat
    if (message.roomType == 1) {
      const roomSingleId = this.roomService.generateSingleRoomId(
        (client as any).userId,
        message.receivedId,
      );
      console.log('Single chat roomId:', roomSingleId);
      // Check if the room already exists
      // If it doesn't, create a new room
      if (!(await this.roomService.checkRoomExists(roomSingleId))) {
        const newRoom = await this.roomService.createRoom({
          id: roomSingleId,
          isGroup: false,
          memberIds: [(client as any).userId, message.receivedId],
        });
        this.server.to(newRoom._id.toHexString()).emit('message', {
          data: message,
          from: (client as any).username,
        });
        const socketsInRoom = await this.server.in(newRoom.id).fetchSockets();
        const allSocketsOnlineInServer = await this.server.fetchSockets();
      } else {
      }
    } else {
    }
    this.server.emit('message', {
      from: 'server',
      data: message,
    });
  }
}
