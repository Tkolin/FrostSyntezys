import { gql } from '@apollo/client'

// Получение списка всех цепей метеринга термисторов
export const GET_METERING_THERMISTOR_CHAINS_BY_INSTALLED = gql`
  query GetMeteringThermistorChainsByInstalled {
    MeteringThermistorChainsByInstalled {
      id
      installed_thermistor_chains_id
      date_metering
      created_at
      updated_at
      installed_thermistor_chain
      metering_thermistor_chain_points {
        id
        metering_thermistor_chain_id
        value
        created_at
        updated_at
      }
    }
  }
`
export const GET_METERING_THERMISTOR_CHAINS = gql`
  query GetMeteringThermistorChains {
    MeteringThermistorChains {
      id
      installed_thermistor_chains_id
      date_metering
      created_at
      updated_at
      installed_thermistor_chain
      metering_thermistor_chain_points {
        id
        metering_thermistor_chain_id
        value
        created_at
        updated_at
      }
    }
  }
`

// Получение одной цепи метеринга термисторов по ID
export const GET_METERING_THERMISTOR_CHAIN = gql`
  query GetMeteringThermistorChain($id: ID!) {
    MeteringThermistorChain(id: $id) {
      id
      installed_thermistor_chains_id
      date_metering
      created_at
      updated_at
      installed_thermistor_chain
      metering_thermistor_chain_points {
        id
        metering_thermistor_chain_id
        value
        created_at
        updated_at
      }
    }
  }
`

// Пагинация цепей метеринга термисторов
export const GET_METERING_THERMISTOR_CHAINS_PAGINATE = gql`
  query GetMeteringThermistorChainsPaginate($first: Int, $page: Int) {
    MeteringThermistorChainPaginated(first: $first, page: $page) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        installed_thermistor_chains_id
        date_metering
        created_at
        updated_at
        installed_thermistor_chain
        metering_thermistor_chain_points {
          id
          metering_thermistor_chain_id
          value
          created_at
          updated_at
        }
      }
    }
  }
`

// Создание новой цепи метеринга термисторов
export const CREATE_METERING_THERMISTOR_CHAIN = gql`
  mutation CreateMeteringThermistorChain(
    $installed_thermistor_chains_id: ID
    $date_metering: String
    $metering_thermistor_chain_points: [MeteringThermistorChainPointInput!]!
  ) {
    createMeteringThermistorChain(
        installed_thermistor_chains_id:  $installed_thermistor_chains_id
        date_metering: $date_metering
        metering_thermistor_chain_points: $metering_thermistor_chain_points
    ) {
      id
      installed_thermistor_chains_id
      date_metering
    }
  }
`

// Обновление цепи метеринга термисторов
export const UPDATE_METERING_THERMISTOR_CHAIN = gql`
  mutation UpdateMeteringThermistorChain(
    $id: ID!
    $installed_thermistor_chains_id: ID
    $date_metering: String
    $created_at: String
    $updated_at: String
    $installed_thermistor_chain: String
  ) {
    updateMeteringThermistorChain(
      id: $id
      installed_thermistor_chains_id: $installed_thermistor_chains_id
      date_metering: $date_metering
      created_at: $created_at
      updated_at: $updated_at
      installed_thermistor_chain: $installed_thermistor_chain
    ) {
      id
      installed_thermistor_chains_id
      date_metering
      created_at
      updated_at
      installed_thermistor_chain
    }
  }
`

// Удаление цепи метеринга термисторов
export const DELETE_METERING_THERMISTOR_CHAIN = gql`
  mutation DeleteMeteringThermistorChain($id: ID!) {
    deleteMeteringThermistorChain(id: $id) {
      id
    }
  }
`
