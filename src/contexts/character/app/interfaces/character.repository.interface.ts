
import { CharacterEntity } from "../../infra/persistence/typeorm/Character.entity.js";

export interface ICharacterRepository {
    findAll(): Promise<CharacterEntity[]>;

    findById(id: number): Promise<CharacterEntity | null>;

    create(data: Omit<CharacterEntity, "id" | "createdAt" | "updatedAt">): Promise<CharacterEntity>;

    update(
        id: number,
        data: Partial<Omit<CharacterEntity, "id" | "createdAt" | "updatedAt">>
    ): Promise<CharacterEntity | null>;

    delete(id: number): Promise<boolean>;

    search(term: string): Promise<CharacterEntity[]>;
}
