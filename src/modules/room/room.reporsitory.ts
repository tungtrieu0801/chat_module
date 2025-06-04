import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ChatRoom } from "../entities/chatroom.entity";

@Injectable()
export class RoomRepository extends Repository<ChatRoom> {
    constructor(private readonly dataSource: DataSource) {
        super(ChatRoom, dataSource.createEntityManager());
    }
}