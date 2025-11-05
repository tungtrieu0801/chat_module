import { Request } from 'express';
export interface AuthUser {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
