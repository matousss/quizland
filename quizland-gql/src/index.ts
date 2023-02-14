// import {default as getApollo} from "./apollo";
import {default as getYoga} from "./yoga";
import {ERROR_CODES} from "../lib/graphql/error";

const getServer = getYoga;

// noinspection JSUnusedGlobalSymbols
export default getServer;

export {ERROR_CODES}