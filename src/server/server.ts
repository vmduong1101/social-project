import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import _ from 'lodash';
import userResolvers from '../graphql/user/resolvers';
import userTypeDefs from '../graphql/user/typeDef';

const app = express() as any

//Routes
app.use(express.json())

//Apollo Server
const startApolloServer = async () => {
  const resolvers = _.merge({}, userResolvers)
  const typeDefs = [userTypeDefs]

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start();
  server.applyMiddleware({ app , cors: true});
  
  app.listen(Number(process.env.PORT), process.env.HOST_NAME, () => {
  console.log(`Server running at http://${process.env.HOST_NAME}:${process.env.PORT}${server.graphqlPath}`);
})}

startApolloServer()