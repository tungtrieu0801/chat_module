import { Request } from 'express';
export interface AuthUser {
  sub: string;
  username: string;
  avatarUrl: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
