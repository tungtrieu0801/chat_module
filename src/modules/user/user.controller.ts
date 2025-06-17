import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('searchUserByPhone')
    public async searchUserByPhone(@Query('input') input: string) {
        return await this.userService.searchUsers(input);
    }
}