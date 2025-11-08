import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
    RedisModule,
    UserModule,
  ],
  controllers: [QrcodeController],
  providers: [QrcodeService],
})
export class QrcodeModule {}
