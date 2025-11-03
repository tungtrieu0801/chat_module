import { Module } from '@nestjs/common';
import { Room, RoomShema } from './room.schema';
import { RoomService } from './room.service';
import { Message } from '../message/message.entity';
import { RoomController } from './room.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomShema }])
  ],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy],
  exports: [RoomService, MongooseModule],
})
export class RoomModule {}