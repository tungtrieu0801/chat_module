// import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
// import { NotificationDto } from "./dto/notification.dto";
// import { NotificationService } from "./notification.service";
// import { Controller, Get, Param, Query } from "@nestjs/common";

// @Controller('notification')
// export class NotificationController {
//     constructor (
//         private readonly notficationService: NotificationService
//     ) {}

//     @Get('all')
//     public async getAllNotifications(
//         @Query('userId') userId: string,
//         @Query('page') page: number,
//         @Query('size') limit: number
//     ): Promise<BaseResponseApiDto<NotificationDto[]>> {
//         return this.notficationService.getAllNotifications(userId, page, limit);
//     }

//     @Get(':notificationId')
//     public async getDetail(@Param('notificationId') notificationId: string): Promise<BaseResponseApiDto<NotificationDto>> {
//         return this.notficationService.getDetail(notificationId);
//     }

//     public async markNotificationAsRead(@Param('notificationId') notificationId: string): Promise<void> {
//         return this.notficationService.markNotificationAsRead(notificationId);
//     }

//     public async deleteNotification(notificationId: string): Promise<void> {
//         return this.notficationService.deleteNotification(notificationId);
//     }

//     public async createNotification(notificationData: any): Promise<void> {
//         return this.notficationService.createNotification(notificationData);
//     }

//     public async getNotificationSettings(userId: string): Promise<any> {
//         return this.notficationService.getNotificationSettings(userId);
//     }

//     public async updateNotificationSettings(userId: string, settings: any): Promise<void> {
//         return this.notficationService.updateNotificationSettings(userId, settings);
//     }

// }
