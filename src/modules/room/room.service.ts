import { Injectable } from "@nestjs/common";
import { Room, RoomDocument } from "./room.schema";
import { BaseResponseApiDto } from "src/common/response/base-response-api.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ROOM_MESSAGES } from "src/common/contants";
import { RoomDto } from "./dto/room.dto";

@Injectable()
export class RoomService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    public async getListRoom(userId: string): Promise<BaseResponseApiDto<RoomDto[]>> {
        const rooms = await this.roomModel.find({ memberIds: userId }).lean();

        // Find partnerIds.
        const partnerIds = rooms
            .filter(room => !room.isGroup && room.memberIds.length === 2)
            .map(room => room.memberIds.find(id => id !== userId))
            .filter(Boolean);

        const partners = await this.roomModel.find({ _id: { $in: partnerIds } }).lean();
        const userMap = new Map(partners.map(u => [u._id.toString(), u]));
        const result: RoomDto[] = rooms.map(room => {
            const partnerId = room.memberIds.find(id => id !== userId);
            const partner = partnerId ? userMap.get(partnerId) : null;

            return {
                id: room._id.toString(),
                roomSingleId: room.roomSingleId ?? '',
                name: room.isGroup ? room.name : (partner?.name || 'Unknown'),
                description: room.description ?? '',
                isMuted: room.isMuted ?? false,
                isGroup: room.isGroup,
                memberIds: room.memberIds,
                lastMessage: room.lastMessage ?? '',
                lastMessageAt: room.lastMessageAt ?? new Date(),
                createdBy: room.createdBy ?? '',
                avatar: room.isGroup ? (room.avatar ?? null) : (partner?.avatar ?? null),
                pinnedBy: room.pinnedBy ?? [],
                unreadCounts: new Map(Object.entries(room.unreadCounts ?? {})),
                status: room.status ?? 'active',
            };
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