import gql from 'graphql-tag';

export default gql`query User($id: ID!){
    User(id: $id){
        id
        name
        email
        email_verified_at
        password
        remember_token
        created_at
        updated_at
    }
}`;