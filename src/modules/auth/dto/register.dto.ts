import { IsNotEmpty } from "class-validator";

export class RegisterRequest {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phoneNumber: string;

}