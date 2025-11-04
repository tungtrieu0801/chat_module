import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
} from './dto';
import { User } from '../user/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login API for user',
    description: 'Authenticated user and return access token',
  })
  @ApiBody({ type: LoginRequest })
  @ApiResponse({
    status: 201,
    description: 'Login successfully',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password'
  })
  public login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public test(): string {
    return 'Hello world!';
  }
}
