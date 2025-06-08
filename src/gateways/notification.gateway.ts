import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { socketMiddleware } from "src/middleware/socket.middleware";
import { RoomService } from "src/modules/room/room.service";

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
    namespace: '/notification'
})
export class NotificationGateway implements OnGatewayConnection {
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
    }

    // Notify to user online in room when new message is sent
    async notifyNewMessageInRoom(roomId: string, message: any) {}

    // Notify to user online but not in room when new messsage is sent
    async notifyUserOnlineNotInRoom(userId: string, roomId: string) {}

    // Notify to user when be added to a room
    async notifyUserAddedToRoom(userId: string, roomId: string) {}

    // Notify to user when be removed from a room
    async notifyUserRemovedFromRoom(userId: string, roomId: string) {}

    // Notify to user in room when message is pinned or unpinned
    async notifyMessagePinnedInRoom(roomId: string, messageId: string) {}

    // Notify to user in room when message is deleted
    async notifyMessageDeletedInRoom(roomId: string, messageId: string) {}

    // Notify to user in room when message is edited
    async notifyMessageEditedInRoom(roomId: string, messageId: string) {}

    // Notify to user in room when message is reacted
    async notifyMessageReactedInRoom(roomId: string, messageId: string, reaction: any) {}

    // Notify to user when room information is updated
    async notifyRoomUpdated(roomId: string, roomData: any) {}

    // Notify to user when room is deleted
    async notifyRoomDeleted(roomId: string) {}

}