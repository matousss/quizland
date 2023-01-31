import {readFileSync} from "fs";
import path from "path";
// @ts-ignore
import schema from "../../schema.graphql";


//const schema_path = path.resolve(__dirname, './schema.graphql');
//export const typeDefs = readFileSync(schema_path, { encoding: 'utf-8' });
export const typeDefs = schema;


