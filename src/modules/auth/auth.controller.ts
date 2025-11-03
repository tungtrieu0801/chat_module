import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './dto';
import { BaseResponseApiDto } from 'src/common/response/base-response-api.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // public login(@Body() loginDto: LoginRequest): Promise<BaseResponseApiDto<LoginResponse>> {
  //   return this.authService.login(loginDto);
  // }

  // @Post('register')
  // public register(@Body() registerDto: RegisterRequest): Promise<BaseResponseApiDto<RegisterResponse>> {
  //   return this.authService.register(registerDto);
  // }

  @Get('test')
  public test(): string {
    return 'Hello world!';
  }
}
