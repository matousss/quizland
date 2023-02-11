import { ProviderType } from "../__generated__/resolvers-types";
import { resolve as google } from "./providers/Google";

declare type UserInfo = {
    id: string;
    email: string;

    email_verified: boolean;
    surname: string;
    lastname: string;
    picture?: string;
    access_token: string;
    refresh_token: string;
}
declare type Resolver = (any) => Promise<UserInfo>;
interface ResolverMap {
    [key: string]: Resolver;
}

const resolvers: ResolverMap = {}
resolvers[ProviderType.Google] = google as Resolver;

export {resolvers};