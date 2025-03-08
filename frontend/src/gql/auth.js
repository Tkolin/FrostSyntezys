import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      password_confirmation: $password_confirmation
    ) {
      access_token
      user {
        id
        name
        email
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      access_token
      user {
        id
        name
        email
      }
    }
  }
`
// Пагинация локаций
export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
    }
  }
`
