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
import { Room } from 'src/modules/room/room.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly roomService: RoomService,
  ) { }
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

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message from:', client.id, message);

    // roomtype 1 is for single chat, 2 is for group chat
    if (message.roomType == 1) {
      const roomId = this.roomService.generateSingleRoomId(
        (client as any).id,
        message.receivedId,
      )
      // Check if the room already exists
      // If it doesn't, create a new room
      if (!this.roomService.checkRoomExists(roomId)) {
        const newRoom = await this.roomService.createRoom({
          isMuted: false,
          isGroup: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          memberIds: [(client as any).id, message.receivedId],
        });
        this.server.to(newRoom.id).emit('message', {
          data: message,
          from: (client as any).username,
        });

        
        const socketsInRoom = await this.server.in(newRoom.id).fetchSockets();
        const allSocketsOnlineInServer = await this.server.fetchSockets();


        // Notification for user who online but not in the room
        // for (const userId of newRoom.memberIds) {
        //   // Find socket for the user
        //   const userSocket = allSocketsOnlineInServer.find(
        //     (socket => (socket as any).userId === userId),
        //   );
        //   if (userSocket && !socketsInRoom.includes(userSocket)) {
        //     this.server.to((userSocket as any).userId).emit('notification', {
        //       data: message,
        //       from: 'server'
        //     });
        //   }
        // }

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
