import {Role, User} from "../src/graphql/resolvers-types";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;


export const DEFAULT_TOKEN_LIFESPAN = 60 * 60 * 24 * 30; // 30 days in seconds

const checkPayload = (payload: any): boolean => !!(payload.role && payload.id);


interface JWTPayload {
    role?: Role;
    id?: string;
}

// throws error on verification failure
// returns null if payload is invalid (e.g. old)
// returns payload if valid
const verifyJWT = async (raw: string): Promise<JWTPayload | null> => {
    let token = raw.replace("Token ", "");
    let payload: JWTPayload;
    // verifies secret, checks exp and returns user info if valid
    try {
        payload = await jwt.verify(token, process.env.JWT_SECRET as string) as any;
    } catch (e) {
        return null;
    }

    if (checkPayload(payload)) return payload;
    return null;
}


const generateJWT = (user: User, exp = DEFAULT_TOKEN_LIFESPAN): string => {
    if (user.id === undefined) throw new Error("User ID is undefined");

    let payload: JWTPayload = {
        role: user.role,
        id: user.id
    }

    return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: exp});
}

export {verifyJWT, generateJWT}
export type {JWTPayload}