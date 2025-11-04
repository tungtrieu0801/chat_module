import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
} from './dto';
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

  @Get()
  public test(): string {
    return 'Hello world!';
  }
}
