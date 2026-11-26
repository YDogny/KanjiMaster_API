
import { db } from "../../../../../core/config/data-source.js";
import { RefreshTokenEntity } from "./RefreshToken.entity.js";
import { IRefreshTokenRepository } from "../../../app/interfaces/refresh-token.repository.interface.js";
import { IsNull } from "typeorm";

export class TypeOrmRefreshTokenRepository implements IRefreshTokenRepository {

    async save(data: {
        userId: number;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<RefreshTokenEntity> {

        const repository = db.getRepository(RefreshTokenEntity);

        const refreshToken = repository.create({
            userId: data.userId,
            tokenHash: data.tokenHash,
            expiresAt: data.expiresAt,
            revokedAt: null,
        });

        return await repository.save(refreshToken);
    }

    async findByTokenHash(tokenHash: string): Promise<RefreshTokenEntity | null> {

        return await db.getRepository(RefreshTokenEntity).findOne({
            where: { tokenHash },
        });
    }

    async revoke(tokenHash: string): Promise<void> {

        await db.getRepository(RefreshTokenEntity).update(
            {
                tokenHash,
                revokedAt: IsNull(),
            },
            {
                revokedAt: new Date(),
            }
        );
    }
}
