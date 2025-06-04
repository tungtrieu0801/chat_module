import { Socket } from 'socket.io';
import { validateJwtToken } from 'src/helpers/jwt.helper';
export function socketMiddleware(secret: string) {
    return ( socket: Socket, next: (err?: any) => void ) => {
        const token = socket.handshake.auth.token as string;
        console.log("Token received:", token);
        console.log("Socket middleware called");
        const payload = validateJwtToken(token);
        if(!payload) {
            console.log("Invalid token"); 
            next(new Error('Authentication error: Invalid token'));
        } else {
            console.log("Payload:", payload);
            (socket as any).userId = payload.sub;
            (socket as any).username = payload.username;
            next();
        }
    }   
}