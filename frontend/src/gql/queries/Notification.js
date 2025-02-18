import gql from 'graphql-tag';

export default gql`query Notification($id: ID!){
    Notification(id: $id){
        id
        installed_thermistor_chains_id
        description
        date_start
        date_end
        user_id
        created_at
        updated_at
        installed_thermistor_chain
    }
}`;