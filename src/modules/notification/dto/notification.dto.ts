export class NotificationDto {
  id: string;
  title: string;
  content?: string | null;
  type?: string | null;
  data?: Record<string, any> | null;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<NotificationDto>) {
    Object.assign(this, partial);
  }
}
