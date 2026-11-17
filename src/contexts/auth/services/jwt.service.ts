import "dotenv/config";

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// Vérifier que la variable d'environnement JWT_SECRET est définie
const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (JWT_SECRET.length === 0) {
  throw new Error(
    "La variable JWT_SECRET est manquante dans le fichier .env"
  );
}

// Définir le type de JWT_EXPIRES_IN pour s'assurer qu'il est compatible avec SignOptions["expiresIn"]
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];

export interface TokenPayload extends JwtPayload {
  userId: number;
  email: string;
}

// Service pour gérer les tokens JWT
export class JwtService {

  static generateToken(userId: number, email: string): string {
    const payload: TokenPayload = {
      userId,
      email,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  // Vérifier et décoder un token JWT
  static verifyToken(token: string): TokenPayload {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "number" ||
      typeof decoded.email !== "string"
    ) {
      throw new Error("Token invalide");
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  }
}
