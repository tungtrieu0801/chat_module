import { ApiProperty } from '@nestjs/swagger';

/**
 * Use for API login
 * Contains information such as: username, password, optional rememberMe flag
 */
export class LoginRequest {
  @ApiProperty({
    example: 'alice',
    description: 'Username of user',
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of user',
  })
  password: string;

  @ApiProperty({
    example: 'Tick',
    description: 'Checkbox to remember information',
    required: false,
  })
  rememberMe?: boolean;
}
