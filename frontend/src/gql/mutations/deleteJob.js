import gql from 'graphql-tag';

export default gql`mutation deleteJob($id: ID!){
    deleteJob(id: $id){
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