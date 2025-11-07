import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for generating a temporary token.
 * Includes the generated token string.
 * @Author TungNota
 * @Date November 7, 2025
 */
export class GenerateTokenResponse {
  @ApiProperty({ description: 'Generate temporary token' })
  token: string;
}
