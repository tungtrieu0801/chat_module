import { Injectable } from "@nestjs/common";
import { RoomRepository } from "./room.reporsitory";
import { Room } from "./room.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RoomService {
    private roomRepository: Repository<Room>;
    //After TypeORM 0.3.x, we can use customer repositories directly,
    //we need take it from the data source
    constructor(@InjectDataSource() private dataSource: DataSource) {
        this.roomRepository = this.dataSource.getRepository(Room);
    }

    public async getListRoom(): Promise<Room> {
        return this.roomRepository.createQueryBuilder('room').where(':userId =  ANY(room.memberIds)', { userId}).getMany();
        
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