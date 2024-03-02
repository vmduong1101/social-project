import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from "graphql";
import jwt from 'jsonwebtoken';
import { TypeUser } from "../controllers/userController";
import UserModel from "../models/userModel";

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

const resolvers = {
    Query: {
        users: async () => {
            return await UserModel.findAll();
        }
    },
    Mutation: {
       login: async (parent: void, args: any, context: any, info: GraphQLResolveInfo) => {
            const { user_name, password } = args.arg as TypeUser
            const result = await UserModel.findOne({ where: { user_name } })
            if(result) {
                const { password: hashPassword, ...data } = result.dataValues
                const isPasswordMatch = await bcrypt.compare(password, hashPassword)
                if(isPasswordMatch) {
                    const token = jwt.sign({ user_name, role: data?.role }, ADMIN_SECRET, { expiresIn: '1h' })

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
       }
    }
};

export default resolvers;