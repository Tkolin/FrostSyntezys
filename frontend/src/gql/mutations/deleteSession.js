import gql from 'graphql-tag';

export default gql`mutation deleteSession($id: ID!){
    deleteSession(id: $id){
        id
        user_id
        ip_address
        user_agent
        payload
        last_activity
        created_at
        updated_at
    }
}`;