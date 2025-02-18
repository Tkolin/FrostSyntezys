import gql from 'graphql-tag';

export default gql`query InstalledThermistorChainPoints{
    InstalledThermistorChainPoints{
        installed_thermistor_chains_id
        id
        deep
        created_at
        updated_at
        installed_thermistor_chain
    }
}`;