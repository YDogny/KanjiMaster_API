
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { UserEntity } from "../../../../user/infra/persistence/typeorm/User.entity.js";

@Entity("refresh_tokens")
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "int" })
    userId!: number;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: UserEntity;

    @Index({ unique: true })
    @Column({ type: "varchar", length: 255 })
    tokenHash!: string;

    @Column({ type: "datetime" })
    expiresAt!: Date;

    @Column({ type: "datetime", nullable: true })
    revokedAt!: Date | null;

    @CreateDateColumn({ type: "datetime" })
    createdAt!: Date;
}
