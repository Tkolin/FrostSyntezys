import { gql } from '@apollo/client'

// Получение всех уведомлений
export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    Notifications {
      id
      metering_thermistor_chain_point_id
      type_notification_key
      thermistor_chain
      location
      description
      date_start
      date_end
      user_id
      created_at
      updated_at
      metering_thermistor_chain_points
    }
  }
`

// Получение уведомления по ID
export const GET_NOTIFICATION = gql`
  query GetNotification($id: ID!) {
    Notification(id: $id) {
      id
      metering_thermistor_chain_point_id
      type_notification_key
      thermistor_chain
      location

      description
      date_start
      date_end
      user_id
      created_at
      updated_at
      metering_thermistor_chain_points
    }
  }
`

// Пагинация уведомлений
export const GET_NOTIFICATIONS_PAGINATED = gql`
  query GetNotificationsPaginated($first: Int!, $page: Int!) {
    NotificationPaginated(first: $first, page: $page) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
        __typename
      }
      data {
        id
        metering_thermistor_chain_point_id
        type_notification_key

        description
        date_start
        date_end
        user_id
        created_at
        updated_at
        metering_thermistor_chain_point {
          id
          installed_thermistor_chain_point {
            id
            installed_thermistor_chain {
              location {
                id
                name
              }
              thermistor_chain {
                id
                name
              }
            }
          }

          __typename
        }
        __typename
      }
      __typename
    }
  }
`

// Создание уведомления
export const NOTIFICATION_CHECKED = gql`
  mutation CreateNotification($id: ID) {
    createNotification(id: $id) {
      id
    }
  }
`
export const SET_USER_IN_NOTIFICATION = gql`
  mutation SetUserInNotification($id: ID!, $user_id: ID!, $date_end: String!) {
    setUserInNotification(id: $id, user_id: $user_id, date_end: $date_end) {
      id
      date_end
      user_id
    }
  }
`
// Создание уведомления
export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $id: ID
    $metering_thermistor_chain_point_id: ID
    $description: String
    $date_start: String
    $date_end: String
    $user_id: String
    $created_at: String
    $updated_at: String
    $metering_thermistor_chain_points: String
  ) {
    createNotification(
      id: $id
      metering_thermistor_chain_point_id: $metering_thermistor_chain_point_id
      description: $description
      date_start: $date_start
      date_end: $date_end
      user_id: $user_id
      created_at: $created_at
      updated_at: $updated_at
      metering_thermistor_chain_points: $metering_thermistor_chain_points
    ) {
      id
    }
  }
`

// Обновление уведомления
export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $id: ID!
    $metering_thermistor_chain_point_id: ID
    $description: String
    $date_start: String
    $date_end: String
    $user_id: String
    $created_at: String
    $updated_at: String
    $metering_thermistor_chain_points: String
  ) {
    updateNotification(
      id: $id
      metering_thermistor_chain_point_id: $metering_thermistor_chain_point_id
      description: $description
      date_start: $date_start
      date_end: $date_end
      user_id: $user_id
      created_at: $created_at
      updated_at: $updated_at
      metering_thermistor_chain_points: $metering_thermistor_chain_points
    ) {
      id
    }
  }
`

// Удаление уведомления
export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      id
    }
  }
`
