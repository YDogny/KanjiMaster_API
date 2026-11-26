
import { db } from "../../../../../core/config/data-source.js";

import { CharacterEntity } from "./Character.entity.js";
import { ICharacterRepository } from "../../../app/interfaces/character.repository.interface.js";

export class TypeOrmCharacterRepository implements ICharacterRepository {

    async findAll(): Promise<CharacterEntity[]> {
        return await db.getRepository(CharacterEntity).find({
            order: {
                id: "ASC",
            },
        });
    }

    async findById(id: number): Promise<CharacterEntity | null> {
        return await db.getRepository(CharacterEntity).findOne({
            where: { id },
        });
    }

    async create(
        data: Omit<CharacterEntity, "id" | "createdAt" | "updatedAt">
    ): Promise<CharacterEntity> {
        const repository = db.getRepository(CharacterEntity);

        const character = repository.create(data);

        return await repository.save(character);
    }

    async update(
        id: number,
        data: Partial<Omit<CharacterEntity, "id" | "createdAt" | "updatedAt">>
    ): Promise<CharacterEntity | null> {
        const repository = db.getRepository(CharacterEntity);

        const result = await repository.update(id, data);

        if (result.affected === 0) {
            return null;
        }

        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.getRepository(CharacterEntity).delete(id);

        return (result.affected ?? 0) > 0;
    }

    async search(term: string): Promise<CharacterEntity[]> {
        return await db.getRepository(CharacterEntity)
            .createQueryBuilder("character")
            .where("character.character LIKE :term", { term: `%${term}%` })
            .orWhere("character.romaji LIKE :term", { term: `%${term}%` })
            .orWhere("character.meaning LIKE :term", { term: `%${term}%` })
            .orWhere("character.onYomi LIKE :term", { term: `%${term}%` })
            .orWhere("character.kunYomi LIKE :term", { term: `%${term}%` })
            .orderBy("character.id", "ASC")
            .getMany();
    }
}
