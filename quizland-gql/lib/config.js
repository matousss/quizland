import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env"});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID + '.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const DB_URL = process.env.DB_URL
const JWT_SECRET = process.env.JWT_SECRET


export { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, DB_URL, JWT_SECRET}
