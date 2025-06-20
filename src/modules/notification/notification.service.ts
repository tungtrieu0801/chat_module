// import { Injectable } from "@nestjs/common";
// import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
// import { NotificationDto } from "./dto/notification.dto";
// import { NOTIFICATION_MESSAGES } from "src/common/contants";
// import { InjectRepository } from "@nestjs/typeorm";
// import { NotificationEntity } from "./notification.entity";
// import { Repository } from "typeorm";

// @Injectable()
// export class NotificationService {
//     constructor(
//         @InjectRepository(NotificationEntity)
//         private readonly notiRepository: Repository<NotificationEntity>,
//     ) {}

//     public async getAllNotifications(
//         userId: string,
//         page: number = 1,
//         limit: number = 10,
//     ): Promise<BaseResponseApiDto<NotificationDto[]>> {

//         const [notifications, total] = await this.notiRepository.findAndCount({
//             where: { recipientId: userId },
//             skip: (page - 1) * limit,
//             take: limit,
//             order: { createdAt: 'DESC' },
//         });

//         return {
//         data: notifications.map(n => new NotificationDto(n)),
//         message: NOTIFICATION_MESSAGES.GET_NOTIFICATIONS_SUCCESS,
//         statuCode: 200,
//         meta: {
//             total,
//             page,
//             limit,
//             totalPages: Math.ceil(total / limit),
//         }
//     };
//     }   

//     public async getDetail(notificationId: string): Promise<BaseResponseApiDto<NotificationDto>> {
//         const notification = await this.notiRepository.findOne({
//             where: { id: notificationId },
//         });

//         if (!notification) {
//             throw new Error(NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND);
//         }

//         return {
//             data: new NotificationDto(notification),
//             message: NOTIFICATION_MESSAGES.GET_NOTIFICATIONS_SUCCESS,
//             statuCode: 200,
//         };
//     }

//     public async markNotificationAsRead(notificationId: string): Promise<void> {
//         // Logic to mark a notification as read
//     }

//     public async deleteNotification(notificationId: string): Promise<void> {
//         // Logic to delete a notification
//     }

//     public async createNotification(notificationData: any): Promise<void> {
//         // Logic to create a new notification
//     }

//     public async getNotificationSettings(userId: string): Promise<any> {
//         // Logic to get notification settings for a user
//         return {};
//     }

//     public async updateNotificationSettings(userId: string, settings: any): Promise<void> {
//         // Logic to update notification settings for a user
//     }

// }