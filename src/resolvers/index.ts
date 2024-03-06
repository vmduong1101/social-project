import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from "graphql";
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { checkKeyRequired } from '../helpers/check-key-required';
import UserModel from "../models/userModel";
import { transport } from '../server/server';

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

const resolvers = {
    Query: {
        users: async () => {
            return await UserModel.findAll();
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
                var mail = {
                    from: `Võ Minh Đương <ssgalaxya52@gmail.com>`,
                    to: email,
                    subject: "Xác nhận tài khoản của bạn",
                    html: 
                    `<div>
                        <p>Chào mừng bạn đến với ứng dụng của chúng tôi</p>
                        <p>Đây là mã xác nhận của bạn: ${verificationCode}</p>
                    </div>
                    `
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
    }
};

export default resolvers;