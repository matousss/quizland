import {readFileSync} from "fs";
import path from "path";

const schema_path = path.resolve('./schema.graphql');
export const typeDefs = readFileSync(schema_path, { encoding: 'utf-8' });


