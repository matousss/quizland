import { ProviderType } from "../graphql/resolvers-types";
import { resolve as google } from "./providers/Google";

export declare type UserInfo = {
    id: string;
    email: string;
    surname: string;
    lastname: string;
    image?: string;
}
declare type Resolver = (any) => Promise<UserInfo>;
interface ResolverMap {
    [key: string]: Resolver;
}

const resolvers: ResolverMap = {}
resolvers[ProviderType.Google] = google as Resolver;

export {resolvers};