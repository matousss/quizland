import {Role, User} from "../__generated__/resolvers-types";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;


const DEFAULT_TOKEN_LIFESPAN = 1000 * 60 * 60 * 24 * 30; // 30 days

const checkPayload = (payload: any): boolean => {
    if (payload.role && payload.role == 'User' && payload.id) {
        return true;
    }
    return false;
}

interface JWTPayload {
    role?: Role;
    id?: string;
}

// throws error on verification failure
// returns null if payload is invalid (e.g. old)
// returns payload if valid
const verifyJWT = async (raw: string): Promise<JWTPayload | null> => {
    let token = raw.replace("Token ", "");

    // verifies secret, checks exp and returns user info if valid
    let payload = await jwt.verify(token, process.env.JWT_SECRET as string) as any;

    if (checkPayload(payload)) return payload;


    return null;
}


const generateJWT = (user: User, exp = DEFAULT_TOKEN_LIFESPAN): string => {
    let payload: JWTPayload = {
        role: user.role,
        id: user.id
    }

    return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: exp});
}

export {verifyJWT, generateJWT}
export type {JWTPayload}