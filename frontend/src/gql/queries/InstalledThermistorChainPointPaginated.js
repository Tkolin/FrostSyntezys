import gql from 'graphql-tag';

export default gql`query InstalledThermistorChainPointPaginated($first: Int!, $page: Int){
    InstalledThermistorChainPointPaginated(first: $first, page: $page){
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
            installed_thermistor_chains_id
            id
            deep
            created_at
            updated_at
            installed_thermistor_chain
        }
    }
}`;