import {or, shield} from "graphql-shield";
import {getCanRead, isAuthenticated, isOwner, isServer, isSuperUser} from "./rules";
import {GraphQLSchema} from "graphql/type";
import {DBClient} from "../../lib/mongodb";
import {IRules} from "graphql-shield";
import {AccessDeniedError} from "../../lib/graphql/error";
import {GraphQLError} from "graphql/error";

// todo use permissions system
// todo resolve permissions against schema
// const resolverPermissions = (schema: GraphQLSchema) => {
//
// }


const staticPermissions: IRules = {
    Query: {
        getUserByAccount: isServer,
        discoverCardSets: isServer,
    },
    Mutation: {
        createCardSet: isAuthenticated,
        deleteUser: isSuperUser,
    }
}


export const getPermissions = (dbClient: DBClient) => {
    const canRead = getCanRead(dbClient)

    let perms: IRules = {
        Query: {
            getCardSet: or(isServer, canRead),
            getItem: or(isServer, canRead),
        },
        Mutation: {
            // moveItem: or(isServer, isOwner),
            updateItem: or(isServer, isOwner),
            deleteItem: or(isServer, isOwner),
            updateCards: or(isServer, isOwner),
        }
    }

    Object.keys(staticPermissions).forEach((key) => {
        if (perms[key]) {
            Object.keys(staticPermissions[key]).forEach((subKey) => {
                perms[key][subKey] = staticPermissions[key][subKey];
            })
        } else {
            perms[key] = staticPermissions[key];
        }
    })

    return shield(perms, {
        async fallbackError(err) {
            if (err instanceof GraphQLError) {
                return err
            }

            // unexpected errors

            return new AccessDeniedError("You have insufficient permissions to access this resource")

        },
        allowExternalErrors: true
    });

}

