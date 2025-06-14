import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Room } from '../room/room.entity';

export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    FILE = 'file',
    STICKER = 'sticker',
    OTHER = 'other',
}
@Entity("messages")
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
    type: MessageType;

    @Column({ type: 'text', nullable: true })
    content: string;

    // Metadata for files, stickers, etc.
    @Column({ type: 'jsonb' , nullable: true })
    metadata: Record<string, any> | null;

    @ManyToOne(() => Room, room => room.messages, { onDelete: 'CASCADE' })
    @Index()
    room: Room;

    @ManyToOne(()=> Message, { nullable: true})
    forwardedFrom: Message;

    @Column({ type: 'jsonb', nullable: true })
    reactions: Array<{
        userId: string;
        emoji: string;
    }>;

    @Column({ type: 'simple-array', nullable: true })
    mentionedUserIds: string[] | null;

    @Column({ default: false })
    isPinned: boolean;

    @Column({ default: false })
    isEdited: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'uuid'})
    senderId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}