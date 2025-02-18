import gql from 'graphql-tag';

export default gql`mutation createSession($id: String, $user_id: String, $ip_address: String, $user_agent: String, $payload: String, $last_activity: Int, $created_at: String, $updated_at: String){
    createSession(id: $id, user_id: $user_id, ip_address: $ip_address, user_agent: $user_agent, payload: $payload, last_activity: $last_activity, created_at: $created_at, updated_at: $updated_at){
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