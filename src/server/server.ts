import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import { google } from 'googleapis';
import _ from 'lodash';
import userResolvers from '../graphql/user/resolvers';
import userTypeDefs from '../graphql/user/typeDef';

var nodemailer = require("nodemailer");
const app = express() as any

export const oauth2Client = new google.auth.OAuth2(
  process.env.GG_MAIL_CLIENT_ID,
  process.env.GG_MAIL_CLIENT_SECRET,
  process.env.GG_MAIL_REDIRECT_URI,
);

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

//Nodemailer
export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  access_type: 'offline',
  auth: {
    type: 'OAuth2',
    clientId: process.env.GG_MAIL_CLIENT_ID,
    clientSecret: process.env.GG_MAIL_CLIENT_SECRET,
  },
})

startApolloServer()