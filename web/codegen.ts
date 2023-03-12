
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: true
      },
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
