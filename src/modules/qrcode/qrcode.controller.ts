import { Controller, Post, UseGuards, Req, Query, Get } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  generateToken(@Req() req: AuthRequest): string {
    return this.qrcodeService.generateToken(req.user.sub);
  }

  @Get('/scan')
  scanToken(@Query('token') token: string) {
    const payload = this.qrcodeService.verifyToken(token);
    if (!payload) {
      return { success: false, message: 'Token không hợp lệ hoặc đã hết hạn' };
    }

    return { success: true, userId: payload.userId };
  }
}
