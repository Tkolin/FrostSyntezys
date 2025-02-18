import gql from 'graphql-tag';

export default gql`query Caches{
    Caches{
        key
        value
        expiration
        created_at
        updated_at
        id
    }
}`;