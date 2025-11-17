import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

export function validateJwtToken(token: string): Record<string, any> | null {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not set');
    }
    return jwt.verify(token, JWT_SECRET) as Record<string, any>;
  } catch (error) {
    return null;
  }
}
