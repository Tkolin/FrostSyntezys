import gql from 'graphql-tag';

export default gql`mutation createInstalledThermistorChainPoint($installed_thermistor_chains_id: Int, $id: Int, $deep: String, $created_at: String, $updated_at: String, $installed_thermistor_chain: String){
    createInstalledThermistorChainPoint(installed_thermistor_chains_id: $installed_thermistor_chains_id, id: $id, deep: $deep, created_at: $created_at, updated_at: $updated_at, installed_thermistor_chain: $installed_thermistor_chain){
        installed_thermistor_chains_id
        id
        deep
        created_at
        updated_at
        installed_thermistor_chain
    }
}`;