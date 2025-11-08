// src/modules/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude() // Chỉ expose field nào được @Expose
export class UserDto {
  @ApiProperty({ example: '67383e9a6c48aefb2c8f524a' })
  @Expose()
  @Transform(({ obj }) => obj._id?.toString()) // convert ObjectId → string
  id: string;

  @ApiProperty({ example: 'johndoe' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'John Doe' })
  @Expose()
  fullname: string;

  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: '+84901234567', required: false })
  @Expose()
  phoneNumber?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @Expose()
  avatar?: string;

  @ApiProperty({ example: 'user', required: false })
  @Expose()
  role?: string;

  @ApiProperty({
    example: ['67383e9a6c48aefb2c8f524b', '67383e9a6c48aefb2c8f524c'],
  })
  @Expose()
  friends: string[];

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;

  @ApiProperty({ example: '2025-11-07T09:32:00Z' })
  @Expose()
  created_at: Date;

  @ApiProperty({ example: '2025-11-07T09:33:00Z' })
  @Expose()
  updated_at: Date;
}
