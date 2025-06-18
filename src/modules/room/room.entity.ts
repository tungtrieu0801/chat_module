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

@Entity('room')
export class Room {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'text' })
    name: string;
    
    @Column({ type: 'text', nullable: true })
    description: string | null;
    
    @Column({ name: 'is_muted', type: 'boolean', default: false })
    isMuted: boolean;

    @Column({ name: 'is_group', type: 'boolean', default: false })
    isGroup: boolean;

    @Column({ name: 'created_by', type: 'uuid', nullable: true })
    createdBy: string;

    @CreateDateColumn({ name: 'created_by' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'created_by' })
    updatedAt: Date;
    
    @OneToMany(() => Message, message => message.room)
    messages: Message[];

    @Column({ name: 'memberids', type: 'simple-array', nullable: true })
    memberIds: string[];

}