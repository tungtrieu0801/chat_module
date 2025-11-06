import {
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  create() {
    return this.qrcodeService.create();
  }
}
