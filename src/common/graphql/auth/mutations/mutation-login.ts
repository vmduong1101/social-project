import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($user_name: String!, $password: String!){
    login(arg: {user_name: $user_name, password: $password}){
        code
        message
        access_token
        data {
            full_name
            email
            role
        }
    }
  }
`;