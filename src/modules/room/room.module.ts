import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { ChatGateway } from 'src/gateways/chat-gateway';
import { RoomRepository } from './room.reporsitory';
import { Message } from '../message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RoomRepository, Message]),
  ],
  providers: [RoomService, ChatGateway],
  exports: [RoomService],
})
export class RoomModule {}