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
import { Message } from '../message/message.entity';

@Entity('chat_rooms')
export class Room {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'text' })
    name: string;
    
    @Column({ type: 'text', nullable: true })
    description: string | null;
    
    @Column({ type: 'boolean', default: false })
    isMuted: boolean;

    @Column({ type: 'boolean', default: false })
    isGroup: boolean;

    @Column({ type: 'uuid', nullable: true })
    createdBy: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Message, message => message.room)
    messages: Message[];

    @Column({ type: 'simple-array', nullable: true })
    memberIds: string[];

}