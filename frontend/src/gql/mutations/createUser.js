import gql from 'graphql-tag';

export default gql`mutation createUser($id: Int, $name: String, $email: String, $email_verified_at: String, $password: String, $remember_token: String, $created_at: String, $updated_at: String){
    createUser(id: $id, name: $name, email: $email, email_verified_at: $email_verified_at, password: $password, remember_token: $remember_token, created_at: $created_at, updated_at: $updated_at){
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