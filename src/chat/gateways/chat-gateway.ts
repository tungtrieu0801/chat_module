import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: any) {
        console.log('Received message:', message);
    }
}
