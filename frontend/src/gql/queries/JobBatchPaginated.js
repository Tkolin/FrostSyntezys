import gql from 'graphql-tag';

export default gql`query JobBatchPaginated($first: Int!, $page: Int){
    JobBatchPaginated(first: $first, page: $page){
        paginatorInfo{
            count
            currentPage
            firstItem
            hasMorePages
            lastItem
            lastPage
            perPage
            total
        }
        data{
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
    }
}`;