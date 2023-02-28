import {Role} from "../graphql/resolvers-types";
import {rule} from "graphql-shield";

export const isServer = rule()((parent, args, ctx, info) => {
    return ctx.user.role === Role.Server;
})

export const isAuthenticated = rule()((parent, args, ctx, info) => {
    return ctx.user !== null;
})

export const isOwner = rule()(async (parent, args, ctx, info) => {
    console.log("isOwner", parent, args, ctx, info);
    return true;
})

export const canRead = rule()(async (parent, args, ctx, info) => {
    console.log("canRead", ctx.user);
    console.log({parent, args, info});
    console.log(info.fieldNodes);
    if (ctx.user.role === Role.Server) return true;
    if (ctx.user.role === Role.Admin) return true;



    return true;
})