import {shield} from "graphql-shield";
import {canRead} from "./rules";
import {GraphQLSchema} from "graphql/type";

const resolverPermissions = (schema: GraphQLSchema) => {
    // todo resolve permissions against schema
}


export const permissions = shield({
    Query: {
        getCardSet: canRead
    }
})




