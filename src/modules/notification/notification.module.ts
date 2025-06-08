import { Module } from "@nestjs/common";
import { RoomService } from "../room/room.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./notification.entity";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notitication.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NotificationEntity,
        ])
    ],
    controllers: [
        NotificationController
    ],
    providers: [RoomService, NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}