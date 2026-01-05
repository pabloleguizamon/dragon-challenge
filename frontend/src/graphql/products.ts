import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
      imageUrl
      isActive
      createdAt
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      imageUrl
      isActive
      createdAt
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($searchTerm: String!) {
    searchProducts(searchTerm: $searchTerm) {
      id
      name
      description
      price
      stock
      imageUrl
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      price
      stock
      imageUrl
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: String!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      id
      name
      description
      price
      stock
      imageUrl
      isActive
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;