import { gql } from "@apollo/client";

export const VERIFY = gql`
  mutation verify(
    $password: String!
    $re_password: String!
    $first_name: String
    $last_name: String
    $email: String!
    $code: String!
    )
    {
      verify(arg: {
      first_name: $first_name,
      last_name: $last_name,
      password: $password,
      re_password: $re_password,
      email: $email
      code: $code
    }){
        code
        message
        data {
          first_name,
          last_name,
          full_name,
          email,
        }
    }
  }
`;