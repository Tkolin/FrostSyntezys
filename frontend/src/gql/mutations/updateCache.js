import gql from 'graphql-tag';

export default gql`mutation updateCache($id: ID!, $key: String, $value: String, $expiration: Int, $created_at: String, $updated_at: String){
    updateCache(id: $id, key: $key, value: $value, expiration: $expiration, created_at: $created_at, updated_at: $updated_at){
        key
        value
        expiration
        created_at
        updated_at
        id
    }
}`;