import { Injectable } from "@nestjs/common";
import { Room, RoomDocument } from "./room.schema";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ROOM_MESSAGES } from "src/common/contants";

@Injectable()
export class RoomService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    public async getListRoom(userId: string): Promise<BaseResponseApiDto<Room[]>> {
        const rooms = await this.roomModel.find({ memberIds: userId }).lean();

        // 2. Tìm tất cả partnerIds trong các phòng 1v1
        const partnerIds = rooms
            .filter(room => !room.isGroup && room.memberIds.length === 2)
            .map(room => room.memberIds.find(id => id !== userId))  // lấy id còn lại
            .filter(Boolean); // loại bỏ undefined/null

        // 3. Lấy thông tin các partner 1 lần
        const partners = await this.userModel.find({ _id: { $in: partnerIds } }).lean();
        const userMap = new Map(partners.map(u => [u._id.toString(), u]));

        // 4. Gộp dữ liệu và phân biệt loại phòng
        const result = rooms.map(room => {
            if (!room.isGroup && room.memberIds.length === 2) {
                const partnerId = room.memberIds.find(id => id !== userId);
                const partner = userMap.get(partnerId);

                return {
                    roomId: room._id,
                    type: '1v1',
                    displayName: partner?.name || 'Unknown',
                    displayAvatar: partner?.avatar || null,
                    lastMessage: room.lastMessage || null,
                };
            } else {
                return {
                    roomId: room._id,
                    type: 'group',
                    displayName: room.name,
                    displayAvatar: room.avatar || null,
                    lastMessage: room.lastMessage || null,
                };
            }
        });

        return {
            data: result,
            message: ROOM_MESSAGES.SUCCESS,
            statuCode: 200
        };
    }

    public async getRoomById(id: string): Promise<BaseResponseApiDto<Room>> {
        const room = await this.roomModel.findById(id).exec();
        return {
            data: room,
            message: ROOM_MESSAGES.SUCCESS,
            statuCode: 200
        }

    }

    public async createRoom(data: Partial<Room>): Promise<RoomDocument> {
        const newRoom = new this.roomModel(data);
        return newRoom.save();
    }

    public async checkRoomExists(roomId: string): Promise<boolean> {
        const result = await this.roomModel.exists({ roomSingleId: roomId });
        console.log("ket qua", result !== null)
        return result !== null;
    }


    //Create a unique room ID for single chat rooms
    public generateSingleRoomId(firstUserId: string, secondUserId: string): string {
        const sortedIds = [firstUserId, secondUserId].sort();
        return `${sortedIds[0]}-${sortedIds[1]}`;
    }
}