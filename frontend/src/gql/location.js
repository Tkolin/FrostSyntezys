import { gql } from '@apollo/client'

// Получение списка всех локаций
export const GET_LOCATIONS = gql`
  query GetLocations {
    Locations {
      id
      name
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
      }
    }
  }
`

// Создание новой локации
export const CREATE_LOCATION = gql`
  mutation CreateLocation($x: Float!, $y: Float!, $name: String!) {
    createLocation(x: $x, y: $y, name: $name) {
      id
    }
  }
`


// Обновление локации
export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: ID!, $x: String, $y: String, $name: String) {
    updateLocation(id: $id, x: $x, y: $y, name: $name) {
      id
    }
  }
`

// Удаление локации
export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)  
  }
`
