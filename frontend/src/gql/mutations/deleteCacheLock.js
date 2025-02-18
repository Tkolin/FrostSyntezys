import gql from 'graphql-tag';

export default gql`mutation deleteCacheLock($id: ID!){
    deleteCacheLock(id: $id){
        key
        owner
        expiration
        created_at
        updated_at
        id
    }
}`;