import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import { google } from 'googleapis';
import resolvers from '../resolvers';
import typeDefs from '../schema';

var nodemailer = require("nodemailer");
const app = express() as any

const HOST_NAME = process.env.HOST_NAME || 'localhost'
const PORT = process.env.PORT || 8081
const GG_MAIL_CLIENT_ID = process.env.GG_MAIL_CLIENT_ID || ''
const GG_MAIL_CLIENT_SECRET = process.env.GG_MAIL_CLIENT_SECRET || ''
const GG_MAIL_REFRESH_TOKEN = process.env.GG_MAIL_REFRESH_TOKEN || ''
const GG_MAIL_ACCESS_TOKEN = process.env.GG_MAIL_ACCESS_TOKEN || ''
const GG_MAIL_REDIRECT_URI = process.env.GG_MAIL_REDIRECT_URI || ''
const GG_MAIL_MY_EMAIL = process.env.GG_MAIL_MY_EMAIL || ''

const oauth2Client = new google.auth.OAuth2(
  GG_MAIL_CLIENT_ID,
  GG_MAIL_CLIENT_SECRET,
  GG_MAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: GG_MAIL_REFRESH_TOKEN
});


//Routes
app.use(express.json())

//Apollo Server
async function startApolloServer(typeDefs: any, resolvers: any){
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await server.start();
  server.applyMiddleware({ app , cors: true});
  
  app.listen(Number(PORT),HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}${server.graphqlPath}`);

})}


//Nodemailer
export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  access_type: 'offline',
  auth: {
    type: 'OAuth2',
    user: GG_MAIL_MY_EMAIL,
    pass: "anhbiAn171200",
    clientId: GG_MAIL_CLIENT_ID,
    clientSecret: GG_MAIL_CLIENT_SECRET,
    refreshToken: GG_MAIL_REFRESH_TOKEN,
    accessToken: GG_MAIL_ACCESS_TOKEN
  },
})


startApolloServer(typeDefs, resolvers)