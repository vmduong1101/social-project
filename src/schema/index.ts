import gql from 'graphql-tag';

const typeDefs = gql
`
type User {
  first_name: String
  last_name: String
  full_name: String
  user_name: String
  email: String
  role: String
  address: String
}

type Query {
  users: [User]
}

type Mutation {
  login(arg: Arg): OutputLogin
  logout(arg: ArgLogout): OutputLogin
}

input Arg {
  user_name: String!
  password: String!
}

input ArgLogout {
  access_token: String
}


type OutputLogin {
  code: Int
  message: String
  access_token: String
  data: User
}
`

export default typeDefs;