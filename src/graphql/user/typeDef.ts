import gql from 'graphql-tag'

const userTypeDefs = gql`
  type Query {
    users: [User]
    signInWithGoogle(arg: ArgSignInWithGoogle): OutputLogin
  }

  type Mutation {
    login(arg: ArgLogin): OutputLogin
    logout(arg: ArgLogout): OutputLogin
    verify(arg: ArgRegister): OutputVerify
    register(arg: ArgRegister): OutputRegister
    generateAuthGoogle: OutputGenerateAuthGoogle
  }

  type OutputGenerateAuthGoogle {
    code: Int
    url: String
  }

  input ArgSignInWithGoogle {
    code: String!
  }

  type OutputLogin {
    code: Int
    message: String
    access_token: String
    data: User
  }

  type User {
    first_name: String
    last_name: String
    full_name: String
    email: String
    role: String
    address: String
    code: String
  }

  input ArgLogin {
    email: String
    password: String!
  }

  input ArgLogout {
    access_token: String
  }

  input ArgRegister {
    first_name: String
    last_name: String
    email: String!
    password: String!
    re_password: String!
  }

  type OutputRegister {
    code: Int
    message: String
    data: DataRegister
  }

  type DataRegister {
    first_name: String,
    last_name: String,
    email: String,
    role: String,
    re_password: String,
    password: String,
    code: String,
  }

  type OutputVerify {
    code: Int
    message: String
    data: DataVerify
  }

  type DataVerify {
    first_name: String,
    last_name: String,
    full_name: String,
    email: String,
  }
`
export default userTypeDefs