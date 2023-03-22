import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function generateJwtToken(userId: string): string {
    const payload = { userId };
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwtToken(token: string): string | object {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }
}
