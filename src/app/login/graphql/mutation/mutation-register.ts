import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register(
    $password: String!
    $re_password: String!
    $first_name: String
    $last_name: String
    $email: String!
    )
    {
    register(arg: {
      first_name: $first_name,
      last_name: $last_name,
      password: $password,
      re_password: $re_password,
      email: $email
    }){
        code
        message
        data {
            first_name
            last_name
            password
            re_password
            code
            email
            role
        }
    }
  }
`;