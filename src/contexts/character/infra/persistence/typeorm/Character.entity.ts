
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

// Les trois types de caractères disponibles
export enum CharacterType {
    HIRAGANA = "hiragana",
    KATAKANA = "katakana",
    KANJI = "kanji",
}

@Entity("characters")
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 10 })
    character!: string;

    @Column({
        type: "enum",
        enum: CharacterType,
    })
    type!: CharacterType;

    @Column({ type: "varchar", length: 100, nullable: true })
    romaji!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    meaning!: string | null;

    @Column({ type: "int", nullable: true })
    strokes!: number | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    onYomi!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    kunYomi!: string | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
