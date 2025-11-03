// import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "../user/user.entity";

// @Entity('roles')
// export class Role {

//     @PrimaryGeneratedColumn('increment')
//     id: number;

//     @Column({ type: 'varchar', unique: true, nullable: false})
//     name: string;

//     @ManyToMany(() => User, (user) => user.roles)
//     users: User[];
// }
