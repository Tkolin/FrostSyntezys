import { gql } from '@apollo/client'

// Получение списка всех установленных термисторных цепей
export const GET_INSTALLED_THERMISTOR_CHAINS = gql`
  query GetInstalledThermistorChains {
    InstalledThermistorChains {
      id
      thermistor_chain_id
      location_id
      created_at
      updated_at
      min_warning_temperature
      max_warning_temperature
      min_critical_temperature
      max_critical_temperature
      thermistor_chain
      location
    }
  }
`

// Получение одной установленной термисторной цепи по ID
export const GET_INSTALLED_THERMISTOR_CHAIN = gql`
  query GetInstalledThermistorChain($id: ID!) {
    InstalledThermistorChain(id: $id) {
      id
      thermistor_chain_id
      location_id
      created_at
      updated_at
      min_warning_temperature
      max_warning_temperature
      min_critical_temperature
      max_critical_temperature
      metering_thermistor_chains {
        id
        date_metering
        metering_thermistor_chain_points {
          id
          value
          installed_thermistor_chain_point_id
        }
      }
      installed_thermistor_chain_points {
        id
        deep
        created_at
        updated_at
        min_warning_temperature
        max_warning_temperature
        min_critical_temperature
        max_critical_temperature
      }
      location
    }
  }
`

// Пагинация установленных термисторных цепей
export const GET_INSTALLED_THERMISTOR_CHAINS_PAGINATE = gql`
  query GetInstalledThermistorChainsPaginate($first: Int!, $page: Int!) {
    InstalledThermistorChainPaginated(first: $first, page: $page) {
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
        thermistor_chain_id
        location_id
        created_at
        updated_at
        min_warning_temperature
        max_warning_temperature
        min_critical_temperature
        max_critical_temperature
        thermistor_chain
        location
      }
    }
  }
`

// Создание новой установленной термисторной цепи
export const CREATE_INSTALLED_THERMISTOR_CHAIN = gql`
  mutation CreateInstalledThermistorChain(
    $thermistor_chain_id: ID
    $location_id: ID
    $min_warning_temperature: Float
    $max_warning_temperature: Float
    $min_critical_temperature: Float
    $max_critical_temperature: Float
  ) {
    createInstalledThermistorChain(
      thermistor_chain_id: $thermistor_chain_id
      location_id: $location_id
      min_warning_temperature: $min_warning_temperature
      max_warning_temperature: $max_warning_temperature
      min_critical_temperature: $min_critical_temperature
      max_critical_temperature: $max_critical_temperature
    ) {
      id
    }
  }
`

// Обновление установленной термисторной цепи
export const UPDATE_INSTALLED_THERMISTOR_CHAIN = gql`
  mutation UpdateInstalledThermistorChain(
    $id: ID!
    $thermistor_chain_id: ID
    $location_id: ID
    $min_warning_temperature: Float
    $max_warning_temperature: Float
    $min_critical_temperature: Float
    $max_critical_temperature: Float
  ) {
    updateInstalledThermistorChain(
      id: $id
      thermistor_chain_id: $thermistor_chain_id
      location_id: $location_id
      min_warning_temperature: $min_warning_temperature
      max_warning_temperature: $max_warning_temperature
      min_critical_temperature: $min_critical_temperature
      max_critical_temperature: $max_critical_temperature
    ) {
      id
    }
  }
`

// Удаление установленной термисторной цепи
export const DELETE_INSTALLED_THERMISTOR_CHAIN = gql`
  mutation DeleteInstalledThermistorChain($id: ID!) {
    deleteInstalledThermistorChain(id: $id) {
      id
    }
  }
`
