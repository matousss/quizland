import {Role} from "../src/graphql/resolvers-types";

export const isSuperUser = (user) => {
    return user.role === Role.Admin || user.role === Role.Server;
}

export const isServer = (user) => {
    return user.role === Role.Server;
}