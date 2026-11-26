
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
    userId: number;
    type: "access";
}

export interface RefreshTokenPayload extends JwtPayload {
    userId: number;
    type: "refresh";
}

export class JwtService {

    private getAccessSecret(): string {
        const secret = process.env.JWT_ACCESS_SECRET;

        if (!secret) {
            throw new Error("JWT_ACCESS_SECRET n'est pas configuré.");
        }

        return secret;
    }

    private getRefreshSecret(): string {
        const secret = process.env.JWT_REFRESH_SECRET;

        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET n'est pas configuré.");
        }

        return secret;
    }

    generateAccessToken(userId: number): string {
        const expiresIn = (
            process.env.JWT_ACCESS_EXPIRES_IN || "15m"
        ) as SignOptions["expiresIn"];

        return jwt.sign(
            {
                userId,
                type: "access",
            },
            this.getAccessSecret(),
            { expiresIn }
        );
    }

    generateRefreshToken(userId: number): string {
        const expiresIn = (
            process.env.JWT_REFRESH_EXPIRES_IN || "7d"
        ) as SignOptions["expiresIn"];

        return jwt.sign(
            {
                userId,
                type: "refresh",
            },
            this.getRefreshSecret(),
            { expiresIn }
        );
    }

    verifyAccessToken(token: string): AccessTokenPayload {
        return this.verifyToken(
            token,
            this.getAccessSecret(),
            "access"
        ) as AccessTokenPayload;
    }

    verifyRefreshToken(token: string): RefreshTokenPayload {
        return this.verifyToken(
            token,
            this.getRefreshSecret(),
            "refresh"
        ) as RefreshTokenPayload;
    }

    private verifyToken(
        token: string,
        secret: string,
        expectedType: "access" | "refresh"
    ): JwtPayload & {
        userId: number;
        type: "access" | "refresh";
    } {

        const decoded = jwt.verify(token, secret);

        if (
            typeof decoded === "string" ||
            typeof decoded.userId !== "number" ||
            !Number.isInteger(decoded.userId) ||
            decoded.type !== expectedType
        ) {
            throw new Error("Token invalide.");
        }

        return decoded as JwtPayload & {
            userId: number;
            type: "access" | "refresh";
        };
    }
}
