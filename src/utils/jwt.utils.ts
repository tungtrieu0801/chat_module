import { JwtService } from '@nestjs/jwt';

export function gennerateJwtToken(
  payload: Record<string, any>,
  jwtService: JwtService,
): string {
  return jwtService.sign(payload);
}

export function verifyJwtToken(
  token: string,
  jwtService: JwtService,
): Record<string, any> | null {
  try {
    return jwtService.verify(token);
  } catch (error) {
    return null;
  }
}
