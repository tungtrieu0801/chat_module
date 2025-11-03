import { Expose } from 'class-transformer';

@Expose()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  isActive: boolean;

  @Expose()
  lastLogin?: Date;

  @Expose()
  role?: string[];

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  isPhoneNumberVerified: boolean;
}
