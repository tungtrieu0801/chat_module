import { JwtService } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';

export function validateJwtToken(
    token: string,
): Record<string, any> | null {
    try {
        return jwt.verify(token, '123456789099') as Record<string, any>;
    } catch (error) {
        return null;
    }
}