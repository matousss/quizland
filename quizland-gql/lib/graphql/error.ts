import {GraphQLError} from "graphql/error";
import exp from "constants";

export const ERROR_CODES = {
    DUPLICIT_EMAIL: "DUPLICIT_EMAIL",
    DUPLICIT_ACCOUNT: "DUPLICIT_ACCOUNT",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    WRITE_ERROR: "WRITE_ERROR",
    INVALID_USER_INPUT: "INVALID_USER_INPUT",
}

export class GQLError extends GraphQLError {
    constructor(message: string, code: string, options = {}) {
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
    constructor(message: string, provider: string, code: string, options=undefined) {
        super(`ProviderError: ${provider}: ${message}`, code, options);
    }
}

export class DuplicitEmailError extends UserError {
    constructor(email: string, options=undefined) {
        super(`Email "${email}" is already in use`, ERROR_CODES.DUPLICIT_EMAIL, options);

    }

}

export class DuplicitAccountError extends UserError {
    constructor(options=undefined) {
        super("Account is already linked to another user", ERROR_CODES.DUPLICIT_ACCOUNT, options);
    }
}


export class ProviderUserNotFound extends ProviderError implements ResourceNotFound {
    constructor(provider: string, options=undefined) {
        super("User not found", provider, ERROR_CODES.USER_NOT_FOUND, options);
    }

}

export class NotLinkedAccountError extends ProviderError {
    constructor(provider: string, options=undefined) {
        super("Account is not linked to any user", provider, ERROR_CODES.USER_NOT_FOUND, options);
    }
}


export class WriteError extends GQLError {
    constructor(message: string, options=undefined) {
        super(message, ERROR_CODES.WRITE_ERROR, options);
    }
}

export class InvalidUserInput extends InputError {
    constructor(message: string, options=undefined) {
        super(message, ERROR_CODES.INVALID_USER_INPUT, options);
    }
}

export class PermissionError extends GQLError {
    constructor(message: string, options=undefined) {
        super(message, "PERMISSION_ERROR", options);
    }
}

export class AccessDeniedError extends PermissionError {
    constructor(message = "Access denied") {
        super(message);
    }
}