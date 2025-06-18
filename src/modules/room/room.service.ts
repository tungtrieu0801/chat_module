import { Injectable } from "@nestjs/common";
import { Room } from "./room.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";

@Injectable()
export class RoomService {
    private roomRepository: Repository<Room>;
    //After TypeORM 0.3.x, we can use customer repositories directly,
    //we need take it from the data source
    constructor(@InjectDataSource() private dataSource: DataSource) {
        this.roomRepository = this.dataSource.getRepository(Room);
    }

    public async getListRoom(userId: string): Promise<Room[]> {
        return this.roomRepository.createQueryBuilder('room').where(':userId =  ANY(room.memberIds)', { userId }).getMany();
        
    }

    public async getRoomById(id: string): Promise<BaseResponseApiDto<Room>> {
        const room = await this.roomRepository.findOneBy({ id });
        return {
            data: room,
            message: 'Room found',
            statuCode: 200
        }
        
    }

    public async createRoom(data: Partial<Room>): Promise<Room> {
        const newRoom = this.roomRepository.create(data);
        return await this.roomRepository.save(newRoom);
    }

    public async checkRoomExists(roomId: string): Promise<boolean> {
        return await this.roomRepository.existsBy({ id: roomId });
    }

    //Create a unique room ID for single chat rooms
    public generateSingleRoomId(firstUserId: string, secondUserId: string): string {
        const sortedIds = [firstUserId, secondUserId].sort();
        return `${sortedIds[0]}-${sortedIds[1]}`;
    }
}