import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../../redis/redis.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

interface QrPayload {
  userId: string;
  name: string;
  avatarUrl: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class QrcodeService {

  private readonly TTL_SECONDS: number = 300;

  constructor(
    private readonly jwtService: JwtService,

    private readonly redisService: RedisService,

    private readonly userService: UserService,
    ) {}
  async generateToken(userId: string): Promise<string> {
    const token = uuidv4();
    await this.redisService.set(token, userId, this.TTL_SECONDS);
    return token;
  }

  async verifyToken(token: string): Promise<UserDto | null> {
    try {
      const data: string | null = await this.redisService.get(token);
      if(!data) return null;
      await this.redisService.del(token);
      return await this.userService.findById(data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
