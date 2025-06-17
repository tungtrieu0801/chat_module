import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './gateways/chat.gateway';
import { RoomService } from './modules/room/room.service';
import { RoomModule } from './modules/room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/database.config';
import { NotificationModule } from './modules/notification/notification.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    RoomModule,
    NotificationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RoomService],
})
export class AppModule {}
