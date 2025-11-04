import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './dto';
import { BaseResponseApiDto } from 'src/common/response/base-response-api.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Get('test')
  public test(): string {
    return 'Hello world!';
  }
}
