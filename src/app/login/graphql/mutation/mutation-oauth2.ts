import { gql } from "@apollo/client";

export const GOOGLE_LOGIN = gql`
  mutation generateAuthGoogle {
    generateAuthGoogle {
      code
      url
    }
  }
`;

export const MS_LOGIN = gql`
  mutation generateAuthMs {
    generateAuthMs {
      code
      url
    }
  }
`;