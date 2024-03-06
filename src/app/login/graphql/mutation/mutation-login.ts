import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!){
    login(arg: {email: $email, password: $password}){
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