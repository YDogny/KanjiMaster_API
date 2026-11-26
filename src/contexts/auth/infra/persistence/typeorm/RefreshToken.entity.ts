
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from "typeorm";

@Entity("refresh_tokens")
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "int" })
    userId!: number;

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
