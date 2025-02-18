import gql from 'graphql-tag';

export default gql`mutation deleteJobBatch($id: ID!){
    deleteJobBatch(id: $id){
        id
        name
        total_jobs
        pending_jobs
        failed_jobs
        failed_job_ids
        options
        cancelled_at
        created_at
        finished_at
        updated_at
    }
}`;