import { gql } from '@apollo/client';

// Получение списка всех термисторных цепей
export const GET_THERMISTOR_CHAINS = gql`
  query GetThermistorChains {
    ThermistorChains {
      id
      model
      number
      name
    }
  }
`;

// Получение одной термисторной цепи по ID
export const GET_THERMISTOR_CHAIN = gql`
  query GetThermistorChain($id: ID!) {
    ThermistorChain(id: $id) {
      id
      number
      name
      created_at
      updated_at

      measurement_range
      error_margin
      measurement_discreteness
      sensor_count
      sensor_distance
      external_interfaces
      additional_interfaces
      memory_type
      antenna_type
      battery_type
      battery_count
      dimensions
    }
  }
`;

// Пагинация термисторных цепей
export const GET_THERMISTOR_CHAINS_PAGINATE = gql`
  query GetThermistorChainPaginate($first: Int!, $page: Int!) {
    ThermistorChainPaginated(first: $first, page: $page) {
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
        number
        name
        created_at
        updated_at

        measurement_range
        error_margin
        measurement_discreteness
        sensor_count
        sensor_distance
        external_interfaces
        additional_interfaces
        memory_type
        antenna_type
        battery_type
        battery_count
        dimensions
      }
    }
  }
`;

// Создание новой термисторной цепи
export const CREATE_THERMISTOR_CHAIN = gql`
  mutation CreateThermistorChain(
    $model: String!  # Обязательное поле
    $number: String
    $name: String
    $point_count: Int
    $point_step: Float
    $measurement_range: Int
    $error_margin: Float
    $measurement_discreteness: Float
    $sensor_count: Int
    $sensor_distance: Float
    $external_interfaces: String
    $additional_interfaces: String
    $memory_type: String
    $antenna_type: String
    $battery_type: String
    $battery_count: Int
    $dimensions: String
  ) {
    createThermistorChain(
      model: $model
      number: $number
      name: $name
      point_count: $point_count
      point_step: $point_step
      measurement_range: $measurement_range
      error_margin: $error_margin
      measurement_discreteness: $measurement_discreteness
      sensor_count: $sensor_count
      sensor_distance: $sensor_distance
      external_interfaces: $external_interfaces
      additional_interfaces: $additional_interfaces
      memory_type: $memory_type
      antenna_type: $antenna_type
      battery_type: $battery_type
      battery_count: $battery_count
      dimensions: $dimensions
    ) {
      id
      number
      name
    }
  }
`;

// Обновление термисторной цепи
export const UPDATE_THERMISTOR_CHAIN = gql`
  mutation UpdateThermistorChain(
    $id: ID!
    $number: String
    $name: String
    $measurement_range: Int
    $error_margin: Float
    $measurement_discreteness: Float
    $sensor_count: Int
    $sensor_distance: Float
    $external_interfaces: String
    $additional_interfaces: String
    $memory_type: String
    $antenna_type: String
    $battery_type: String
    $battery_count: Int
    $dimensions: String
  ) {
    updateThermistorChain(
      id: $id
      number: $number
      name: $name
      measurement_range: $measurement_range
      error_margin: $error_margin
      measurement_discreteness: $measurement_discreteness
      sensor_count: $sensor_count
      sensor_distance: $sensor_distance
      external_interfaces: $external_interfaces
      additional_interfaces: $additional_interfaces
      memory_type: $memory_type
      antenna_type: $antenna_type
      battery_type: $battery_type
      battery_count: $battery_count
      dimensions: $dimensions
    ) {
      id
      number
      name
    }
  }
`;

// Удаление термисторной цепи
export const DELETE_THERMISTOR_CHAIN = gql`
  mutation DeleteThermistorChain($id: ID!) {
    deleteThermistorChain(id: $id) {
      id
    }
  }
`