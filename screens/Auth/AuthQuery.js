import gql from "graphql-tag";

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
/**
 * String! !을 안붙였다고 애러!
 *
 *
 */
export const CONFIRM_SECRET = gql`
  mutation postConfirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation postCreateAccount(
    $name: String!
    $email: String!
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    createAccount(
      name: $name
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    )
  }
`;

export const TEST = gql`
  {
    allUsers {
      id
      name
    }
  }
`;
