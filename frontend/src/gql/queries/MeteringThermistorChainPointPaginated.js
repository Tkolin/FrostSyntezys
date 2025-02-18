import gql from 'graphql-tag';

export default gql`query MeteringThermistorChainPointPaginated($first: Int!, $page: Int){
    MeteringThermistorChainPointPaginated(first: $first, page: $page){
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
            metering_thermistor_chain_id
            created_at
            updated_at
            value
            unit_id
            metering_thermistor_chain
        }
    }
}`;