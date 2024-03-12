import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation logout($access_token: String){
    logout(arg: {access_token: $access_token}){
        code
        message
        access_token
        data {
            url
        }
    }
  }
`;