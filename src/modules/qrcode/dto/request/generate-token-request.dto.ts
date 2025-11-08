import { ApiProperty } from '@nestjs/swagger';

/**
 * Request DTO for generating a temporary token.
 * Includes user information such as fullName and avatarUrl.
 * @Author TungNota
 * @Date November 7, 2025
 */
export class GenerateTokenRequest {
  @ApiProperty({ description: 'fullName of user' })
  fullName: string;

  @ApiProperty({ description: 'avatarUrl of user' })
  avatarUrl: string;
}
