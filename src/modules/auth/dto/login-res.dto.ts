import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Use for return login.
 * Contains id user, username, email, phoneNumber, accessToken, roles, avatarUrl
 */
export class LoginResponse {
  @ApiProperty({
    example: '6909ae77df88946b0878ae98',
    description: 'Id of user',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'alice',
    description: 'Username of user',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'alice robertson',
    description: 'Full name of user',
  })
  @Expose()
  fullName: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '0386267111',
    description: 'Phone number of user',
  })
  @Expose()
  phoneNumber: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTlkMDEwZi1hNDY3LTRlN2QtODMzYi0',
    description: 'Access token generated',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example: 'user',
    description: 'Role of user',
  })
  @Expose()
  roles: string[];

  @ApiProperty({
    example: 'https://cdn.app.com/avatars1/alice.png',
    description: 'Avatar URL',
  })
  @Expose()
  avatar: string;
}
