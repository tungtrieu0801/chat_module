import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { UpdateQrcodeDto } from './dto/update-qrcode.dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post("/generate")
  @UseGuards(JwtAuthGuard)
  create() {
    return this.qrcodeService.create();
  }
}
