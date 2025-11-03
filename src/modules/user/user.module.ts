import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { Role } from "../role/role.entity";
import { AuthModule } from '../auth/auth.module';
import { LoggerMiddleware } from 'src/middleware/log.middleware';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
