// import { Module } from "@nestjs/common";
// import { RoomService } from "../room/room.service";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { NotificationEntity } from "./notification.entity";
// import { NotificationService } from "./notification.service";
// import { NotificationController } from "./notitication.controller";
// import { RoomModule } from "../room/room.module";

// @Module({
//     imports: [
//         TypeOrmModule.forFeature([
//             NotificationEntity,
//         ]),
//         RoomModule
//     ],
//     controllers: [
//         NotificationController
//     ],
//     providers: [RoomService, NotificationService],
//     exports: [NotificationService],
// })
// export class NotificationModule {}
