import {User} from "../__generated__/resolvers-types";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;


const DEFAULT_TOKEN_LIFESPAN = 1000 * 60 * 60 * 24 * 30; // 30 days

const checkPayload = (payload: any): boolean => {
    if (payload.id) {
        return true;
    }
    return false;
}

interface JWTPayload {
    id: string;
}

const verifyJWT = async (raw: string): Promise<JWTPayload | null> => {
    let token = raw.replace("Token ", "");

    // verifies secret, checks exp and returns user info if valid
    let payload = await jwt.verify(token, process.env.JWT_SECRET as string) as any;

    if (checkPayload(payload)) return {id: payload['id']};


    return null;
}


const generateJWT = (user: User, exp = DEFAULT_TOKEN_LIFESPAN): string => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: exp});
}

export {verifyJWT, generateJWT}
export type {JWTPayload}