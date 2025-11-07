import { Controller, Post, UseGuards, Req, Query, Get } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { GenerateTokenResponse } from './dto/response/generate-token-response.dto';
import { ScanTokenResponseDto } from './dto/response/scan-token-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Generate temporary token for client to generate QR code',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully generated QR code',
    type: GenerateTokenResponse,
  })
  generateToken(@Req() req: AuthRequest): GenerateTokenResponse {
    const token: string = this.qrcodeService.generateToken(req.user.sub);
    return { token };
  }

  @Get('/scan')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Scan token in QR code and verify the token',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully scanned and verified the token',
    type: ScanTokenResponseDto,
  })
  scanToken(@Query('token') token: string): ScanTokenResponseDto {
    const payload = this.qrcodeService.verifyToken(token);
    if (!payload) {
      return { success: false, message: 'Token không hợp lệ hoặc đã hết hạn' };
    }

    return { success: true, userId: payload.userId };
  }
}
