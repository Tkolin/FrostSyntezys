import gql from 'graphql-tag';

export default gql`query Jobs{
    Jobs{
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