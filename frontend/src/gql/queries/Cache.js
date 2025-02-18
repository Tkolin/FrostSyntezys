import gql from 'graphql-tag';

export default gql`query Cache($id: ID!){
    Cache(id: $id){
        key
        value
        expiration
        created_at
        updated_at
        id
    }
}`;