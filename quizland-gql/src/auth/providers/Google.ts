import {LoginTicket, OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} from "../../../lib/config";

import type {TokenPayload} from "google-auth-library"

const oauth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
].join(' ')


const default_options = {
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    response_type: "code",
    redirect_uri: GOOGLE_REDIRECT_URI
}

const get_auth_url = () => {
    return oauth2Client.generateAuthUrl({
        ...default_options,

    })
}

const resolve_code = async (code: string) => {
    let ticket: LoginTicket;
    let payload: TokenPayload;
    let {tokens} = await oauth2Client.getToken(code);
    ticket = await oauth2Client.verifyIdToken(
        {
            idToken: tokens.id_token,
            audience: GOOGLE_CLIENT_ID
        }
    )
    payload = ticket.getPayload() as TokenPayload;

    return {
        id: payload.sub,
        email: payload.email,
        email_verified: payload.email_verified,
        surname: payload.given_name,
        lastname: payload.family_name,
        image: payload.picture
    }
}

export {oauth2Client}

export {resolve_code as resolve}