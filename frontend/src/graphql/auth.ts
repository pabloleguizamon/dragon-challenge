import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $firstName: String, $lastName: String) {
    register(registerInput: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
      createdAt
    }
  }
`;