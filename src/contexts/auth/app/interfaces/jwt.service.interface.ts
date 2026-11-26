
export interface IJwtService {

    generateAccessToken(userId: number): string;

    generateRefreshToken(userId: number): string;

    getRefreshTokenExpiration(token: string): Date;

    verifyAccessToken(token: string): {
        userId: number;
        type: "access";
    };

    verifyRefreshToken(token: string): {
        userId: number;
        type: "refresh";
    };

}
