import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://192.168.0.224:8000/graphql",
   generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config