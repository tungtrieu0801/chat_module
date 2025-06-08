import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("notification")
export class NotificationEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'text' })
    title: string;    

    @Column({ type: 'text', nullable: true })
    content: string | null;

    @Column({ type: 'text', nullable: true })
    type: string | null; 

    @Column({ type: 'jsonb', nullable: true })
    data: Record<string, any> | null;

    @Column({ name:'is_read', default: false })
    isRead: boolean;

    @Column({ name: 'recipient_id', type: 'uuid'})
    recipientId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}