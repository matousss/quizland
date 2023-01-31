import {OAuth2Client} from "google-auth-library";
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

enum State {
    signin = "signin",
    signup = "signup",
}

const default_options = {
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    response_type: "code",
}

const resolve_code = async (code: string) => {
    let ticket
    let payload: TokenPayload;
    console.log({code})
    try {
        ticket = await oauth2Client.verifyIdToken(
            {
                idToken: code,
                audience: process.env.GOOGLE_CLIENT_ID,
            }
        )
        console.log({ticket})
        payload = ticket.getPayload() as TokenPayload;
    } catch (e) {
        console.log("Error while resolving google auth", e)
        return null;
    }
}

export {oauth2Client, State}

export {resolve_code as resolve}