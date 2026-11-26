import { createHash } from "crypto";

export class RefreshTokenHasher {

    hash(token: string): string {
        return createHash("sha256")
            .update(token)
            .digest("hex");
    }

}