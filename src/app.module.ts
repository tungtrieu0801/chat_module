// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './gateways/chat.gateway';
import { RoomService } from './modules/room/room.service';
import { RoomModule } from './modules/room/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongooseConfig } from './configs/database.config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QrcodeModule } from './modules/qrcode/qrcode.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    MongooseModule.forRootAsync({ // GIỮ LẠI CẤU HÌNH CHO MONGODB
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongooseConfig,
    }),
    RoomModule,
    UserModule,
    QrcodeModule,
    AuthModule, 
    // Loại bỏ UserModule lặp lại
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RoomService],
})
export class AppModule {}