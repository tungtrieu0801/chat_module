// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { BaseResponseApiDto } from 'src/common/response/base-response-api.dto';
// import { NotificationDto } from './dto/notification.dto';
// import { NOTIFICATION_MESSAGES } from 'src/common/contants';
// import { Notification, NotificationDocument } from './notification.schema';
//
// @Injectable()
// export class NotificationService {
//   constructor(
//     @InjectModel(Notification.name)
//     private readonly notificationModel: Model<NotificationDocument>,
//   ) {}
//
//   // Lấy danh sách notification, hỗ trợ phân trang
//   public async getAllNotifications(
//     userId: string,
//     page: number = 1,
//     limit: number = 10,
//   ): Promise<BaseResponseApiDto<NotificationDto[]>> {
//     const total = await this.notificationModel.countDocuments({
//       recipientId: userId,
//     });
//
//     const notifications = await this.notificationModel
//       .find({ recipientId: userId })
//       .sort({ created_at: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean();
//
//     return {
//       data: notifications.map((n) => new NotificationDto(n)),
//       message: NOTIFICATION_MESSAGES.GET_NOTIFICATIONS_SUCCESS,
//       statuCode: 200,
//       meta: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     };
//   }
//
//   // Lấy chi tiết 1 notification
//   public async getDetail(
//     notificationId: string,
//   ): Promise<BaseResponseApiDto<NotificationDto>> {
//     const notification = await this.notificationModel
//       .findById(notificationId)
//       .lean();
//     if (!notification) {
//       throw new NotFoundException(NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND);
//     }
//     return {
//       data: new NotificationDto(notification),
//       message: NOTIFICATION_MESSAGES.GET_NOTIFICATIONS_SUCCESS,
//       statuCode: 200,
//     };
//   }
//
//   // Đánh dấu notification đã đọc
//   public async markNotificationAsRead(notificationId: string): Promise<void> {
//     const result = await this.notificationModel.updateOne(
//       { _id: notificationId },
//       { $set: { isRead: true } },
//     );
//     if (result.matchedCount === 0) {
//       throw new NotFoundException(NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND);
//     }
//   }
//
//   // Xoá notification
//   public async deleteNotification(notificationId: string): Promise<void> {
//     const result = await this.notificationModel.deleteOne({
//       _id: notificationId,
//     });
//     if (result.deletedCount === 0) {
//       throw new NotFoundException(NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND);
//     }
//   }
//
//   // Tạo notification mới
//   public async createNotification(
//     notificationData: Partial<Notification>,
//   ): Promise<NotificationDocument> {
//     return await this.notificationModel.create(notificationData);
//   }
//
//   // Các cài đặt notification (nếu cần)
//   public getNotificationSettings(userId: string): any {
//     // Implement tùy requirement
//     return {};
//   }
//
//   public async updateNotificationSettings(
//     userId: string,
//     settings: any,
//   ): Promise<void> {
//     // Implement tùy requirement
//   }
// }
