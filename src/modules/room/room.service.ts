import { Injectable } from "@nestjs/common";
import { Room, RoomDocument } from "./room.schema";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class RoomService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    public async getListRoom(userId: string): Promise<Room[]> {
        return this.roomModel.find({ memberIds: userId }).exec();

    }

    public async getRoomById(id: string): Promise<BaseResponseApiDto<Room>> {
        const room = await this.roomModel.findById(id).exec();
        return {
            data: room,
            message: 'Room found',
            statuCode: 200
        }

    }

    public async createRoom(data: Partial<Room>): Promise<RoomDocument> {
        const newRoom = new this.roomModel(data);
        return newRoom.save();
    }

    public async checkRoomExists(roomId: string): Promise<boolean> {
        const result =  await this.roomModel.exists({ roomSingleId: roomId });
        console.log("ket qua", result !== null)
        return result !== null;
    }


    //Create a unique room ID for single chat rooms
    public generateSingleRoomId(firstUserId: string, secondUserId: string): string {
        const sortedIds = [firstUserId, secondUserId].sort();
        return `${sortedIds[0]}-${sortedIds[1]}`;
    }
}