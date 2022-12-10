
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: "src/**/*.ts*",
  generates: {
    "src/__generated": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
