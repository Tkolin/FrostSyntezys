import gql from 'graphql-tag';

export default gql`mutation createCacheLock($key: String, $owner: String, $expiration: Int, $created_at: String, $updated_at: String){
    createCacheLock(key: $key, owner: $owner, expiration: $expiration, created_at: $created_at, updated_at: $updated_at){
        key
        owner
        expiration
        created_at
        updated_at
        id
    }
}`;