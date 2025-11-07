import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for the response after scanning a token.
 * Indicates whether the scan was successful and includes the user ID if valid.
 * @Author TungNota
 * @Date November 7, 2025
 */
export class ScanTokenResponseDto {
  @ApiProperty({ description: 'Indicates if the token scan was successful' })
  success: boolean;

  @ApiProperty({ description: 'User ID associated with the token' })
  userId?: string;

  @ApiProperty({ description: 'Message success or error details' })
  message?: string;
}
