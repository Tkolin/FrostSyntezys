import gql from 'graphql-tag';

export default gql`query MeteringThermistorChainPoints{
    MeteringThermistorChainPoints{
        id
        metering_thermistor_chain_id
        created_at
        updated_at
        value
        unit_id
        metering_thermistor_chain
    }
}`;