import type {Context} from "@/apollo";
import type {GraphQLResolveInfo} from "graphql/type";

interface QueryResolvers {
    [key: string]: (parent: Function|any,
                    args: {[key: string]: string|number|boolean|any},
                    context?: Context,
                    info?: GraphQLResolveInfo) => any|Promise<any>
}

export type {QueryResolvers};