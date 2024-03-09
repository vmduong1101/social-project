import axios from 'axios';
import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from "graphql";
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { checkKeyRequired } from '../../helpers/check-key-required';
import { transport } from '../../server/server';
import UserModel from './model';
const querystring = require('querystring');

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

const saltRounds = 10;

export type TypeUser = {
    first_name: string
    last_name: string
    email: string
    password: string
    re_password: string
    role?: string
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
              });

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

            console.log('googleUser', googleUser)
            
            return {
                code: 200,
                message: 'Login success',
                access_token,
                data: googleUser
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
              return {
                code: 200,
                message: 'Logout success',
                access_token: '',
                data: null
            }
        },
        verify: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { first_name, email, last_name, password, role = 'user' } = args.arg as TypeUser & { re_password: string }
            const newPassword = await bcrypt.hash(password, saltRounds)
            const full_name = Object.values({ first_name, last_name}).filter(Boolean).join(' ') || null

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

                const data = await UserModel.create({
                    first_name,
                    last_name,
                    full_name,
                    password: newPassword,
                    email,
                    role
                }) 

                return {
                    code: 200,
                    message: 'Register success',
                    access_token: '',
                    data: data
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

                const data = await axios.post('https://oauth2.googleapis.com/token', {
                    client_id: process.env.GG_MAIL_CLIENT_ID,
                    client_secret: process.env.GG_MAIL_CLIENT_SECRET,
                    refresh_token: process.env.GG_MAIL_REFRESH_TOKEN,
                    grant_type: 'refresh_token',
                })
 
                var mail = {
                    from: `Võ Minh Đương <${process.env.GG_MY_EMAIL}>`,
                    to: email,
                    subject: "Xác nhận tài khoản của bạn",
                    html: 
                    `<div>
                        <p>Chào mừng bạn đến với ứng dụng của chúng tôi</p>
                        <p>Đây là mã xác nhận của bạn: ${verificationCode}</p>
                    </div>
                    `,
                    auth: {
                        user: process.env.GG_MY_EMAIL,
                        accessToken: data?.data?.access_token,
                      },
                }

                const result = await transport.sendMail(mail)

                if(result) {
                    const data = {
                        first_name,
                        last_name,
                        full_name,
                        password,
                        re_password,
                        email,
                        role,
                        code: verificationCode
                    }
    
                    return {
                        code: 200,
                        message: 'Send email success',
                        data: data
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
    }
};

export default userResolvers;