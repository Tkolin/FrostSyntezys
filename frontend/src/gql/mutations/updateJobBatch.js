import gql from 'graphql-tag';

export default gql`mutation updateJobBatch($id: String, $name: String, $total_jobs: Int, $pending_jobs: Int, $failed_jobs: Int, $failed_job_ids: String, $options: String, $cancelled_at: String, $created_at: Int, $finished_at: String, $updated_at: String){
    updateJobBatch(id: $id, name: $name, total_jobs: $total_jobs, pending_jobs: $pending_jobs, failed_jobs: $failed_jobs, failed_job_ids: $failed_job_ids, options: $options, cancelled_at: $cancelled_at, created_at: $created_at, finished_at: $finished_at, updated_at: $updated_at){
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