import { gql } from '@apollo/client'

// Получение списка всех локаций
export const GET_LOCATIONS = gql`
  query GetLocations {
    Locations {
      id
      name
      x
      y
      main_location_id
      main_location {
        id
        name
      }
      sub_locations {
        id
        name
      }
    }
  }
`

// Получение одной локации по ID
export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    Location(id: $id) {
      id
      x
      y
      created_at
      updated_at
      name
      main_location_id
      main_location {
        id
        name
      }
      sub_locations {
        id
        name
      }
      installed_thermistor_chains {
        id
        name
      }
    }
  }
`

// Пагинация локаций
export const GET_LOCATIONS_PAGINATE = gql`
  query GetLocationsPaginate($first: Int!, $page: Int!) {
    LocationPaginated(first: $first, page: $page) {
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
        x
        y
        created_at
        updated_at
        name
        main_location_id
        main_location {
          id
          name
        }
      }
    }
  }
`
// Создание новой локации
export const CREATE_LOCATION = gql`
  mutation CreateLocation(
    $x: Float!
    $y: Float!
    $name: String!
    $main_location_id: ID
  ) {
    createLocation(
      x: $x
      y: $y
      name: $name
      main_location_id: $main_location_id
    ) {
      id
      name
      x
      y
      main_location_id
    }
  }
`
export const SYNC_LOCATIONS_HIERARCHY = gql`
  mutation SyncLocationsHierarchy($hierarchy: [LocationHierarchyInput!]!) {
    syncLocationsHierarchy(hierarchy: $hierarchy)
  }
`;
// Обновление локации
export const UPDATE_LOCATION = gql`
  mutation UpdateLocation(
    $id: ID!
    $x: Float
    $y: Float
    $name: String
    $main_location_id: ID
  ) {
    updateLocation(
      id: $id
      x: $x
      y: $y
      name: $name
      main_location_id: $main_location_id
    ) {
      id
      name
      x
      y
      main_location_id
    }
  }
`

// Удаление локации
export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`
