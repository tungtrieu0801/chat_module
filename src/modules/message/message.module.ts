import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../room/room.schema';
import { User, UserSchema } from '../user/user.entity';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService], // MessageService là Provider
  exports: [MessageService], // QUAN TRỌNG: Phải export để App Module thấy
})
export class MessageModule {}
