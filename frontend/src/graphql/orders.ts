import { gql } from '@apollo/client';

export const GET_MY_ORDERS_QUERY = gql`
  query GetMyOrders {
    myOrders {
      id
      total
      status
      createdAt
      items {
        id
        quantity
        price
        subtotal
        product {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

export const GET_ALL_ORDERS_QUERY = gql`
  query GetAllOrders {
    orders {
      id
      total
      status
      createdAt
      user {
        id
        email
        firstName
        lastName
      }
      items {
        id
        quantity
        price
        subtotal
        product {
          id
          name
        }
      }
    }
  }
`;

export const GET_ORDERS_BY_USER_QUERY = gql`
  query GetOrdersByUser($userId: String!) {
    ordersByUser(userId: $userId) {
      id
      total
      status
      createdAt
      items {
        id
        quantity
        price
        subtotal
        product {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      total
      status
      createdAt
      items {
        id
        quantity
        price
        subtotal
        product {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($id: String!, $updateOrderStatusInput: UpdateOrderStatusInput!) {
    updateOrderStatus(id: $id, updateOrderStatusInput: $updateOrderStatusInput) {
      id
      status
    }
  }
`;