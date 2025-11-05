import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { User, UserSchema } from '../user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy],
  exports: [RoomService, MongooseModule],
})
export class RoomModule {}
