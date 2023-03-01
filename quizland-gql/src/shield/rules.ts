import {Permission, Role} from "../graphql/resolvers-types";
import {rule} from "graphql-shield";
import {hasMinimalPermission, isOwner as _isOwner} from "../../lib/permissions";
import {DBClient, parseIfNumber} from "../../lib/mongodb";
import {AccessDeniedError} from "../../lib/graphql/error";

export const isServer = rule()((parent, args, ctx, info) => {
    return ctx.user.role === Role.Server;
})

export const isAdmin = rule()((parent, args, ctx, info) => {
    return ctx.user.role === Role.Admin;
})

export const isSuperUser = rule()((parent, args, ctx, info) => {
    return ctx.user.role === Role.Admin || ctx.user.role === Role.Server;
})

export const isAuthenticated = rule()((parent, args, ctx, info) => {
    return ctx.user !== null;
})

export const getIsOwner = (client: DBClient) => rule()(async (parent, args, ctx, info) => {
    let id = parseIfNumber(args.id)

    let item = await client.quiz.Items.findOne({_id: id})
    if (!item) return true


    return _isOwner(ctx.user, item)
})

const permissionRule = (perm: Permission, client: DBClient) => rule()(async (parent, args, ctx, info) => {


        if (ctx.user.role === Role.Server) return true;
        if (ctx.user.role === Role.Admin) return true;

        let id = parseIfNumber(args.id);

        if (!id) return true;

        let item = await client.quiz.Items.findOne({_id: id});
        if (!item) return true;

        if (_isOwner(ctx.user, item)) return true;

        if (item.permissions === null) return true;

        if (hasMinimalPermission(ctx.user, item, perm)) return true;

        throw new AccessDeniedError("You have insufficient permissions to access this resource");
    }
)


export const getCanRead = (client: DBClient) => permissionRule(Permission.R, client);
export const getCanWrite = (client: DBClient) => permissionRule(Permission.W, client);