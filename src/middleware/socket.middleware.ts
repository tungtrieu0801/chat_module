import { Socket } from 'socket.io';
import { validateJwtToken } from 'src/helpers/jwt.helper';
export function socketMiddleware(secret: string) {
  return (socket: Socket, next: (err?: any) => void) => {
    const token = socket.handshake.auth.token as string;
    const payload = validateJwtToken(token);
    if (!payload) {
      next(new Error('Authentication error: Invalid token'));
    } else {
      (socket as any).userId = payload.sub;
      (socket as any).username = payload.username;
      console.log('id la: ', (socket as any).userId);
      next();
    }
  };
}
