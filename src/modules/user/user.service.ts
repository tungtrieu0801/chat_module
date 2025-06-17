import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
import { UserDto } from "./user.dto";

export class UserService {
    constructor() {}

    public async searchUsers(input: string): Promise<BaseResponseApiDto<UserDto>> {
        const url = `http://20.255.156.113:3000/user/searchByPhone?query=${encodeURIComponent(input)}`
        console.log("URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        const roomSingleId = this.generateSingleRoomId('a487097d-cef8-4fb0-9db1-a0ba725e1dce', data.data.id); // Giả sử bạn có id của người dùng từ data.data.id
        const userDto = new UserDto({
        ...data.data,
        roomSingleId,
    });
        return {
            data: new UserDto(userDto), 
            message: "Search users successfully",
            statuCode: 200,
        }
    }


    public generateSingleRoomId(firstUserId: string, secondUserId: string): string {
        const sortedIds = [firstUserId, secondUserId].sort();
        return `${sortedIds[0]}-${sortedIds[1]}`;
    }
}