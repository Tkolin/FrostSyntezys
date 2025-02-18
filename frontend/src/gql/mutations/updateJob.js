import gql from 'graphql-tag';

export default gql`mutation updateJob($id: Int, $queue: String, $payload: String, $attempts: Int, $reserved_at: String, $available_at: Int, $created_at: Int, $updated_at: String){
    updateJob(id: $id, queue: $queue, payload: $payload, attempts: $attempts, reserved_at: $reserved_at, available_at: $available_at, created_at: $created_at, updated_at: $updated_at){
        id
        queue
        payload
        attempts
        reserved_at
        available_at
        created_at
        updated_at
    }
}`;