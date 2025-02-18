import gql from 'graphql-tag';

export default gql`mutation updateNotification($id: Int, $installed_thermistor_chains_id: Int, $description: String, $date_start: String, $date_end: String, $user_id: String, $created_at: String, $updated_at: String, $installed_thermistor_chain: String){
    updateNotification(id: $id, installed_thermistor_chains_id: $installed_thermistor_chains_id, description: $description, date_start: $date_start, date_end: $date_end, user_id: $user_id, created_at: $created_at, updated_at: $updated_at, installed_thermistor_chain: $installed_thermistor_chain){
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