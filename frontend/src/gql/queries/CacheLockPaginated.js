import gql from 'graphql-tag';

export default gql`query CacheLockPaginated($first: Int!, $page: Int){
    CacheLockPaginated(first: $first, page: $page){
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
            key
            owner
            expiration
            created_at
            updated_at
            id
        }
    }
}`;