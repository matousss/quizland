import {GraphQLFieldResolver, GraphQLSchema} from "graphql/type";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {AccessDeniedError} from "../../lib/graphql/error";
import {isServer, isSuperUser} from "../../lib/permissions";
import {Context} from "../graphql/context";

const resolveFieldDirective = (schema, directive, resolver: GraphQLFieldResolver<any, Context>) =>
    (fieldConfig, _fieldName, typeName) => {
        const privateDirective = getDirective(schema, fieldConfig, directive)?.[0];

        if (!!privateDirective) {
            console.log({_fieldName})
            const {resolve} = fieldConfig
            fieldConfig.resolve = resolver
            return fieldConfig
        }
        return fieldConfig
    }

const privateDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const privateDirective = getDirective(schema, fieldConfig, 'private')?.[0];
        if (privateDirective) {

            const {resolve} = fieldConfig
            fieldConfig.resolve = function (source, args, context, info) {
                const user = context.user
                if (user.id !== source.id && !isSuperUser(user)) {
                    throw new AccessDeniedError(`Access denied to ${typeName}.${_fieldName}`)
                }
                return resolve(source, args, context, info)
            }
            return fieldConfig
        }
    }
});

const serverDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const privateDirective = getDirective(schema, fieldConfig, 'server')?.[0];
        if (privateDirective) {

            const {resolve} = fieldConfig
            fieldConfig.resolve = function (source, args, context, info) {
                console.log("server",{_fieldName})
                const user = context.user
                if (!isServer(user)) {
                    throw new AccessDeniedError(`Access denied to ${typeName}.${_fieldName} (server only)`)
                }
                return resolve(source, args, context, info)
            }
            return fieldConfig
        }
    }
})

const internalDirectiveTransformer = (schema: GraphQLSchema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: resolveFieldDirective(schema, 'internal',
        (source, args, context, info) => {
            throw new AccessDeniedError(`Access denied to ${info.parentType}.${info.fieldName}, fields are internal`)
        })
})


export const directiveTransformers = [privateDirectiveTransformer, serverDirectiveTransformer, internalDirectiveTransformer]