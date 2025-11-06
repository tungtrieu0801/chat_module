import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface QrPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class QrcodeService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  verifyToken(token: string): QrPayload | null {
    try {
      return this.jwtService.verify<QrPayload>(token);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
