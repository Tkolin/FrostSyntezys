import gql from 'graphql-tag';

export default gql`query JobPaginated($first: Int!, $page: Int){
    JobPaginated(first: $first, page: $page){
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
            queue
            payload
            attempts
            reserved_at
            available_at
            created_at
            updated_at
        }
    }
}`;