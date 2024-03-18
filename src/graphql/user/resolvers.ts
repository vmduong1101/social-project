import axios from 'axios';
import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from "graphql";
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { checkKeyRequired } from '../../helpers/check-key-required';
import { google } from 'googleapis';
import { RegisterModel, UserModel } from './model';
const querystring = require('querystring');

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''
var nodemailer = require("nodemailer");

const saltRounds = 10;

export enum EnumAccount {
    Normal = 'normal',
    Google = 'google',
    Microsoft = 'microsoft'
}

export type TypeUser = {
    first_name: string
    last_name: string
    email: string
    password: string
    re_password: string
    role?: string
    picture?: string
    account: EnumAccount
}

const userResolvers = {
    Query: {
        users: async () => {
            return await UserModel.findAll();
        },
        signInWithGoogle: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { code } = args.arg

            const getTokens = ({
                code,
                clientId,
                clientSecret,
                redirectUri,
              }: {
                code: string;
                clientId: string;
                clientSecret: string;
                redirectUri: string;
              }): Promise<{
                access_token: string;
                expires_in: Number;
                refresh_token: string;
                scope: string;
                id_token: string;
              }> => {
                {
                    const url = "https://oauth2.googleapis.com/token";
                    const values = {
                      code,
                      client_id: clientId,
                      client_secret: clientSecret,
                      redirect_uri: redirectUri,
                      grant_type: "authorization_code",
                    };
                  
                    return axios.post(url, values)
                      .then((res) => res.data)
                      .catch((error) => {
                        console.error(`Failed to fetch auth tokens`);
                        throw new Error(error.message);
                    });
                }
            }
            
            const { id_token, access_token } = await getTokens({
                code,
                clientId: process.env.GG_ACCOUNT_CLIENT_ID || '',
                clientSecret: process.env.GG_ACCOUNT_CLIENT_SECRET || '',
                redirectUri: process.env.GG_ACCOUNT_REDIRECT_URI || '',
            })

            const googleUser = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                  headers: {
                    Authorization: `Bearer ${id_token}`,
                  },
                }
            )
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });

            const user = await UserModel.findOne({ where: { email: googleUser?.email } })

            if(!!user) {
                const oldUser = user?.dataValues || {}
                if(oldUser?.account !== EnumAccount.Google) {
                    return {
                        code: 400,
                        access_token: null,
                        message: 'Email already exist',
                        data: null
                    }
                }
                const token = jwt.sign({ user: oldUser?.email, role: oldUser?.role }, ADMIN_SECRET, { expiresIn: '1h' })
                return {
                    code: 200,
                    access_token: token,
                    message: 'Login with google success',
                    data: oldUser
                }
            } else {
                const data = await UserModel.create({
                    full_name: googleUser?.name,
                    email: googleUser?.email,
                    role: 'user',
                    picture: googleUser?.picture,
                    account: EnumAccount.Google
                })

                const token = jwt.sign({ user: data?.dataValues?.email, role: data?.dataValues?.role }, ADMIN_SECRET, { expiresIn: '1h' })
                return {
                    code: 200,
                    access_token: token,
                    message: 'Login with google success',
                    data: data
                }
            }
        },
        signInWithMs: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { code } = args?.arg

            if(!code) {
                return {
                    code: 400,
                    message: 'Invalid code'
                }
            }

            const tokenUrl = 'https://login.microsoftonline.com/559734cc-6d36-4fe9-9f94-8221128e7ab2/oauth2/v2.0/token'
            const values = {
                code: code,
                client_id: process.env.MS_ACCOUNT_CLIENT_ID || '',
                client_secret: process.env.MS_ACCOUNT_CLIENT_SECRET || '',
                redirect_uri: process.env.MS_ACCOUNT_REDIRECT_URI || '',
                scope: 'offline_access openid email profile User.Read',
                grant_type: "authorization_code",
            };

            const {access_token} = await axios.post(tokenUrl, values, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch auth tokens`);
                throw new Error(error.message);
            });

            const userUrl = 'https://graph.microsoft.com/v1.0/me'
            const msUser = await axios.get(userUrl, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });

            const user = await UserModel.findOne({ where: { email: msUser?.mail } })

            if(!!user) {
                const oldUser = user?.dataValues || {}
                const token = jwt.sign({ user: oldUser?.email, role: oldUser?.role }, ADMIN_SECRET, { expiresIn: '1h' })
                return {
                    code: 200,
                    access_token: token,
                    message: 'Login with ms success',
                    data: oldUser
                }
            } else {
                const data = await UserModel.create({
                    full_name: msUser?.surname + ' ' + msUser?.givenName,
                    email: msUser?.mail,
                    role: 'user',
                    picture: msUser?.picture,
                    account: EnumAccount.Microsoft
                })

                return {
                    code: 200,
                    access_token,
                    message: 'Login with ms success',
                    data: data
                }
            }
        }
    },
    Mutation: {
        login: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { email, password } = args.arg as TypeUser
            const result = await UserModel.findOne({ where: { email } })

            if(result) {
                const { password: hashPassword, ...data } = result.dataValues
                const isPasswordMatch = await bcrypt.compare(password, hashPassword)
                if(isPasswordMatch) {
                    const token = jwt.sign({ email, role: data?.role }, ADMIN_SECRET, { expiresIn: '1h' })

                    return {
                        code: 200,
                        message: 'Login success',
                        access_token: token,
                        data: data
                    }
                }
            }
            
            return {
                code: 401,
                message: 'Invalid password or username',
                access_token: '',
                data: null
            }
        },
        logout: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=localhost:3000/login` 

            return {
                code: 200,
                message: 'Logout success',
                access_token: '',
                data: {
                    url: logoutUrl
                }
            }
        },
        verify: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { first_name, email, last_name, password, code, role = 'user' } = args.arg as TypeUser & { re_password: string, code?:string }
            const newPassword = await bcrypt.hash(password, saltRounds)
            const full_name = Object.values({ first_name, last_name}).filter(Boolean).join(' ') || null

            try {
                const dataCheck = await UserModel.findOne({ 
                    where: { 
                        [Op.or]: {
                            email,
                        }
                     }
                })

                if(email) {
                    if(dataCheck?.dataValues?.email === email) {
                        return {
                            code: 400,
                            message: 'Email already exist'
                        }
                    }
                }

                const register = await RegisterModel.findOne({ where: { email, code, expires_at: { [Op.gt]: new Date() } } })

                if(register) {
                    const data = await UserModel.create({
                        first_name,
                        last_name,
                        full_name,
                        password: newPassword,
                        email,
                        role,
                        account: EnumAccount.Normal
                    }) 
    
                    return {
                        code: 200,
                        message: 'Register success',
                        access_token: '',
                        data: data
                    }
                } else {
                    return {
                        code: 400,
                        message: 'Invalid code or code expired',
                        access_token: '',
                        data: null
                    }
                }
            } catch (error: any) {
                return {
                    code: 400,
                    message: error?.message
                }
            }
        },
        register: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { first_name, email, last_name, password, re_password, role = 'user' } = args.arg as TypeUser & { re_password: string }

            const check = checkKeyRequired(args.arg, ['email','password', 're_password'])
            
            if(!isEmpty(check)) {
                return check
            }

            if(password !== re_password) {
                return {
                    code: 400,
                    message: 'The re-entered password must match the original password'
                }
            }

            try {
                const dataCheck = await UserModel.findOne({ 
                    where: { 
                        [Op.or]: {
                            email
                        }
                     }
                })

                if(email) {
                    if(dataCheck?.dataValues?.email === email) {
                        return {
                            code: 400,
                            message: 'Email already exist'
                        }
                    }
                }

                const full_name = Object.values({ first_name, last_name}).filter(Boolean).join(' ') || null
                const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 6)
                const oauth2Client = new google.auth.OAuth2(
                    process.env.GG_MAIL_CLIENT_ID,
                    process.env.GG_MAIL_CLIENT_SECRET,
                    process.env.GG_MAIL_REDIRECT_URI,
                );

                oauth2Client.setCredentials({refresh_token: process.env.GG_MAIL_REFRESH_TOKEN});
                const accessToken = await oauth2Client.getAccessToken()
                const expiresAt = new Date(Date.now() + 60000);

                const existRegister = await RegisterModel.findOne({ where: { email } })

                if(existRegister) {
                    await RegisterModel.update({
                        code: verificationCode,
                        expires_at: expiresAt
                    }, { where: { email } })
                } else {
                    await RegisterModel.create({
                        email,
                        code: verificationCode,
                        expires_at: expiresAt
                    })
                }
                
                var mail = {
                    from: `Võ Minh Đương <${process.env.GG_MAIL_MY_EMAIL}>`,
                    to: email,
                    subject: "Xác nhận tài khoản của bạn",
                    html: 
                    `<div>
                        <p>Chào mừng bạn đến với ứng dụng của chúng tôi</p>
                        <p>Đây là mã xác nhận của bạn: ${verificationCode}</p>
                    </div>
                    `,
                    auth: {
                        user: process.env.GG_MAIL_MY_EMAIL,
                        refreshToken: process.env.GG_MAIL_REFRESH_TOKEN,
                        accessToken: accessToken.token,
                        expires: accessToken.res?.data?.expiry_date,
                    }
                }

                const transport = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      type: 'OAuth2',
                      clientId: process.env.GG_MAIL_CLIENT_ID,
                      clientSecret: process.env.GG_MAIL_CLIENT_SECRET,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                  
                const result = await transport.sendMail(mail)
    
                if(result) {
                    return {
                        code: 200,
                        message: 'Send email success',
                        data: {
                            first_name,
                            last_name,
                            full_name,
                            password,
                            re_password,
                            email,
                            role,
                            code: verificationCode,
                            expires_at: 60000
                        }
                    }   
                } else {

                    return {
                        code: 400,
                        message: 'Send email fail',
                        data: null
                    }
                }

            } catch (error: any) {
                return {
                    code: 400,
                    message: error?.message
                }
            }
        },
        generateAuthGoogle: async () => {
            var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
            const params = {
                redirect_uri: process.env.GG_ACCOUNT_REDIRECT_URI || '',
                client_id: process.env.GG_ACCOUNT_CLIENT_ID|| '',
                access_type: "offline",
                response_type: "code",
                prompt: "consent",
                scope: [
                  "https://www.googleapis.com/auth/userinfo.profile",
                  "https://www.googleapis.com/auth/userinfo.email",
                ].join(" "),
            }

            const url = `${oauth2Endpoint}?${querystring.stringify(params)}`
            return {
                code: 200,
                url: url
            }
        },
        generateAuthMs: async () => {
            var oauth2Endpoint = `https://login.microsoftonline.com/${process.env.MS_ACCOUNT_TENANT_ID}/oauth2/v2.0/authorize`
            const params = {
                redirect_uri: process.env.MS_ACCOUNT_REDIRECT_URI || '',
                client_id: process.env.MS_ACCOUNT_CLIENT_ID || '',
                response_type: "code",
                scope: ["offline_access","openid","email","profile","User.Read"].join(" "),
            }

            const url = `${oauth2Endpoint}?${querystring.stringify(params)}`
            return {
                code: 200,
                url: url
            }
        },
    }
};

export default userResolvers;