import { Expose } from "class-transformer";

export class LoginResponse {

    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    accessToken: string;

    @Expose()
    roles: string[];

    @Expose()
    avatar: string;
    
}