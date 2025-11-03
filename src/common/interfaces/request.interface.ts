import { Request } from 'express';

export interface AuthRequest extends Request {
  user: any; // hoặc user: { id: string; ... } nếu bạn biết cấu trúc
}
