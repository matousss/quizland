import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} from "../../../lib/config";
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


export {oauth2Client, State}