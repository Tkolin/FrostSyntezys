import gql from 'graphql-tag';

export default gql`mutation deleteMeteringThermistorChainPoint($id: ID!){
    deleteMeteringThermistorChainPoint(id: $id){
        id
        metering_thermistor_chain_id
        created_at
        updated_at
        value
        unit_id
        metering_thermistor_chain
    }
}`;