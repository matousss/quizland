import {GraphQLFieldResolver, GraphQLSchema} from "graphql/type";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {AccessDeniedError} from "../../lib/graphql/error";
import {isServer, isSuperUser} from "../../lib/permissions";
import {Context} from "../graphql/context";

const resolveFieldDirective = (schema, directive, resolver: (resolve) => GraphQLFieldResolver<any, Context>) =>
    (fieldConfig, _fieldName, typeName) => {
        const privateDirective = getDirective(schema, fieldConfig, directive)?.[0];

        if (!!privateDirective) {
            const {resolve} = fieldConfig
            fieldConfig.resolve = resolver(resolve)
            return fieldConfig
        }
        return fieldConfig
    }

const privateDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: resolveFieldDirective(schema, 'private', (resolve) => (source, args, context, info) => {
        const user = context.user
        if (user.id.toString() !== source.id && !isSuperUser(user)) {
            throw new AccessDeniedError(`Access denied to ${info.parentType}.${info.fieldName}`)
        }
        return resolve(source, args, context, info)
    })
});

const serverDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: resolveFieldDirective(schema, 'server',
        (resolve) => (source, args, context, info) => {
            const user = context.user
            if (!isServer(user)) {
                throw new AccessDeniedError(`Access denied to ${info.parentType}.${info.fieldName} (server only)`)
            }
            return resolve(source, args, context, info)
        })
})

const internalDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: resolveFieldDirective(schema, 'internal',
        () => (source, args, context, info) => {
            throw new AccessDeniedError(`Access denied to ${info.parentType}.${info.fieldName}, fields are internal`)
        })
})


export const directiveTransformers = [privateDirectiveTransformer, serverDirectiveTransformer, internalDirectiveTransformer]