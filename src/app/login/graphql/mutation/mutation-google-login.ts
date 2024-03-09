import { gql } from "@apollo/client";

export const GOOGLE_LOGIN = gql`
  mutation generateAuthGoogle {
    generateAuthGoogle {
      code
      url
    }
  }
`;