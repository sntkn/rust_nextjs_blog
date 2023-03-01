
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': {
      preset: 'client',
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
