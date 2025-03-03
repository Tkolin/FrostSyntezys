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
      thermistor_chain
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
    $min_warning_temperature: String
    $max_warning_temperature: String
    $min_critical_temperature: String
    $max_critical_temperature: String
    $thermistor_chain: String
    $location: String
  ) {
    createInstalledThermistorChain(
      thermistor_chain_id: $thermistor_chain_id
      location_id: $location_id
      min_warning_temperature: $min_warning_temperature
      max_warning_temperature: $max_warning_temperature
      min_critical_temperature: $min_critical_temperature
      max_critical_temperature: $max_critical_temperature
      thermistor_chain: $thermistor_chain
      location: $location
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
    $min_warning_temperature: String
    $max_warning_temperature: String
    $min_critical_temperature: String
    $max_critical_temperature: String
    $thermistor_chain: String
    $location: String
  ) {
    updateInstalledThermistorChain(
      id: $id
      thermistor_chain_id: $thermistor_chain_id
      location_id: $location_id
      min_warning_temperature: $min_warning_temperature
      max_warning_temperature: $max_warning_temperature
      min_critical_temperature: $min_critical_temperature
      max_critical_temperature: $max_critical_temperature
      thermistor_chain: $thermistor_chain
      location: $location
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
