import {OAuth2Client} from "google-auth-library";

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
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