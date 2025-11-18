import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequest, LoginResponse, RegisterRequest } from './dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USER_MESSAGES } from 'src/common/constants';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { username, password } = loginRequest;

    // 🔹 Tìm user theo username hoặc email
    const user =
      (await this.userService.findOne({ username })) ||
      (await this.userService.findOne({ email: username }));

    if (!user) {
      throw new UnauthorizedException(USER_MESSAGES.INVALID_CREDENTIALS);
    }

    // 🔹 So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(USER_MESSAGES.INVALID_CREDENTIALS);
    }

    // 🔹 Tạo payload JWT
    const payload = {
      sub: user._id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    // 🔹 Chuẩn hóa dữ liệu trả về
    const loginResponse: LoginResponse = plainToInstance(LoginResponse, {
      id: user._id,
      username: user.username,
      fullName: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // roles: user.roles?.map((role) => role.name) ?? [],
      avatar: user.avatar,
      accessToken,
    });

    // 🔹 Trả về dạng BaseResponseApiDto
    return loginResponse;
  }

  public async register(registerRequest: RegisterRequest): Promise<User> {
    const { username, email, password } = registerRequest;

    // 🔹 Kiểm tra trùng username/email
    const existingUser =
      (await this.userService.findOne({ username })) ||
      (await this.userService.findOne({ email }));

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // 🔹 Mã hoá mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Lưu user mới vào DB
    const user = await this.userService.create({
      ...registerRequest,
      password: hashedPassword,
    });

    return user;
  }
}
