import { Injectable } from '@nestjs/common';
import { UpdateQrcodeDto } from './dto/update-qrcode.dto';

@Injectable()
export class QrcodeService {
  create() {
    return 'This action adds a new qrcode';
  }

  generateToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  verifyToken(token: string): { userId: string } | null {
    try {
      return this.jwtService.verify(token) as { userId: string };
    } catch (err) {
      return null;
    }
  }

  findAll() {
    return `This action returns all qrcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qrcode`;
  }

  update(id: number, updateQrcodeDto: UpdateQrcodeDto) {
    return `This action updates a #${id} qrcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} qrcode`;
  }
}
