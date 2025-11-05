// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Notification, NotificationDocument } from './notification.schema';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { NotificationDto } from './dto/notification.dto';
//
// @Injectable()
// export class NotificationService {
//   constructor(
//     @InjectModel(Notification.name)
//     private readonly notificationModel: Model<NotificationDocument>,
//   ) {}
//
//   async createNotification(
//     createDto: CreateNotificationDto,
//   ): Promise<NotificationDto> {
//     const created = new this.notificationModel(createDto);
//     const saved = await created.save();
//
//     // convert Mongoose document to plain object / DTO
//     return {
//       id: saved._id.toString(),
//       title: saved.title,
//       content: saved.content,
//       isRead: saved.isRead,
//       createdAt: saved.createdAt,
//     };
//   }
//
//   async getNotifications(): Promise<{
//     data: NotificationDto[];
//     meta: { total: number };
//   }> {
//     const notifications = await this.notificationModel.find().exec();
//     const data: NotificationDto[] = notifications.map((n) => ({
//       id: n._id.toString(),
//       title: n.title,
//       content: n.content,
//       isRead: n.isRead,
//       createdAt: n.createdAt,
//     }));
//
//     return {
//       data,
//       meta: { total: data.length },
//     };
//   }
// }
