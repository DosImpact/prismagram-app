import gql from "graphql-tag";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
/**
 * String! !을 안붙였다고 애러!
 */

export const TEST = gql`
  {
    allUsers {
      id
      name
    }
  }
`;
