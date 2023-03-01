import {Permission, Role} from "../src/graphql/resolvers-types";
import {DItem} from "./types";

export const isSuperUser = (user) => {
    return user.role === Role.Admin || user.role === Role.Server;
}

export const isServer = (user) => {
    return user.role === Role.Server;
}

export const isOwner = (user, item) => {
    return user.id.toString() === item.owner.toString();
}

export const hasPermission = (user, item, perm: Permission) => {
    return item.permissions.find(perm => perm.user === user.id.toString()) === perm.toString();
}

const PERMISSIONS_DIRECTIVES = [Permission.R.toString(), Permission.W.toString(), Permission.M.toString()]
export const hasMinimalPermission = (user, item: DItem, perm: Permission) => {
    let permissions = item.permissions;

    if (permissions === null) return true;
    let userPermission = permissions.find(perm => perm.user.toString() === user.id.toString());
    if (!userPermission) return false;

    return PERMISSIONS_DIRECTIVES.indexOf(perm) <= PERMISSIONS_DIRECTIVES.indexOf(userPermission.permission);
}