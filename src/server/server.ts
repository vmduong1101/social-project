import 'dotenv/config';
import express, { Express } from 'express';
import userRoutes from '../routes/userRoutes';
import typeDefs from '../schema';
import resolvers from '../resolvers';
import { ApolloServer } from 'apollo-server-express';

const app: Express = express()

const HOST_NAME = process.env.HOST_NAME || 'localhost'
const PORT = process.env.PORT || 8081

app.use(express.json())

//Routes
app.use('/api/v1', userRoutes)

//Apollo Server
async function startApolloServer(typeDefs: any, resolvers: any){
  const server = new ApolloServer({typeDefs, resolvers})
  await server.start();
  server.applyMiddleware({app , cors: true});
  
  app.listen(Number(PORT),HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}${server.graphqlPath}`);

})}

startApolloServer(typeDefs, resolvers)