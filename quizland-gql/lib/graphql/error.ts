import {GraphQLError} from "graphql/error";

export const ERROR_CODES = {
    DUPLICIT_EMAIL: "DUPLICIT_EMAIL",
    DUPLICIT_ACCOUNT: "DUPLICIT_ACCOUNT",
    USER_NOT_FOUND: "USER_NOT_FOUND"
}

export class GQLError extends GraphQLError {
    constructor(message, code, options = {}) {
        super(message, {extensions: {code: code, ...options}});
    }
}


export interface ResourceNotFound {
}

export class InputError extends GQLError {
}

export class AuthError extends InputError {
}

export class UserError extends AuthError {
}

export class ProviderError extends AuthError {
    constructor(message, provider, code, options=undefined) {
        super(`ProviderError: ${provider}: ${message}`, code, options);
    }
}

export class DuplicitEmailError extends UserError {
    constructor(email, options=undefined) {
        super(`Email "${email}" is already in use`, ERROR_CODES.DUPLICIT_EMAIL, options);

    }

}

export class DuplicitAccountError extends UserError {
    constructor(options=undefined) {
        super("Account is already linked to another user", ERROR_CODES.DUPLICIT_ACCOUNT, options);
    }
}


export class ProviderUserNotFound extends ProviderError implements ResourceNotFound {
    constructor(provider, options=undefined) {
        super("User not found", provider, ERROR_CODES.USER_NOT_FOUND, options);
    }

}
