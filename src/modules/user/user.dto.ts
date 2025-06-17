export class UserDto {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    phoneNumber: string;
    lastLogin: Date | null;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    roomSingleId: string | null;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}