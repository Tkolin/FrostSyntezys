import gql from 'graphql-tag';

export default gql`query SessionPaginated($first: Int!, $page: Int){
    SessionPaginated(first: $first, page: $page){
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
            user_id
            ip_address
            user_agent
            payload
            last_activity
            created_at
            updated_at
        }
    }
}`;