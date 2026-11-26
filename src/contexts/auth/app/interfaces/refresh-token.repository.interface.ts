
import { RefreshTokenEntity } from "../../infra/persistence/typeorm/RefreshToken.entity.js";

export interface IRefreshTokenRepository {
    save(data: {
        userId: number;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<RefreshTokenEntity>;

    findByTokenHash(tokenHash: string): Promise<RefreshTokenEntity | null>;

    revoke(tokenHash: string): Promise<void>;
}
