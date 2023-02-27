import {shield} from "graphql-shield";
import {canRead} from "./rules";

export const permissions = shield({
    Query: {
        getCardSet: canRead
    }
})