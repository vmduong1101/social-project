import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { successResponseMessageHandler } from '../const/messageResponse';
import { errorResponseHandler } from '../helpers/queryResponse';
import UserModel from '../models/userModel';

const saltRounds = 10;

export type TypeUser = {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    user_name?: string;
    password: string;
    role: string;
    address?: string;
    email?: string;
}

export type TypeError = {
    message?: string;
}

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

class UserController {
    getAllUser = async (req: Request, res: Response)=> {
        try {
            const result = await UserModel.findAll()
            if(result) {
                return res.status(200).json({
                    code: 200,
                    message: successResponseMessageHandler.get(),
                    data: result
                })
            }
            
        } catch (error: any) {
            return errorResponseHandler(res, error?.message)
        }
    }

    createUser = async (req: Request, res: Response) => {
        const user = req.body as TypeUser
        const { password, last_name, first_name, user_name, role = 'user', address, email } = user || {}

        const newPassword = await bcrypt.hash(password, saltRounds)
        const full_name = Object.values({first_name, last_name}).filter(Boolean).join(' ') || null
        const newUser = {
            first_name,
            last_name,
            full_name,
            user_name,
            password: newPassword,
            role,
            address,
            email
        }

        try {
            const result = await UserModel.findOne({ where: { user_name } })

            if(result) {
                return res.status(400).json({
                    code: 400,
                    message:'Username already exist',
                })
            }
            
            if(role === 'root') {
                return res.status(400).json({
                    code: 400,
                    message:'You are not authorized to create root user',
                })
            }    
            
        } catch (error: any) {
            return errorResponseHandler(res, error?.message)
        }

        try {
            const result = await UserModel.create(newUser)

            if(result) {
                const { password, ...data } = result.dataValues
                return res.status(200).json({
                    code: 200,
                    message: successResponseMessageHandler.create('user'),
                    data: data
                })
            }
            
        } catch (error: any) {
            return errorResponseHandler(res, error?.message)
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const result = await UserModel.destroy({ where: { id } })
            if(result) {
                return res.status(200).json({
                    code: 200,
                    message: successResponseMessageHandler.delete('user')
                })
            }
            return res.status(404).json({
                code: 404,
                message: 'User not found'
            })
        } catch (error: any) {
            return errorResponseHandler(res, error?.message)
        }
    }

    login = async (req: Request, res: Response) => {
        const { user_name, password } = req.body as TypeUser
        try {
            const result = await UserModel.findOne({ where: { user_name } })
            if(result) {
                const { password: hashPassword, ...data } = result.dataValues
                const isPasswordMatch = await bcrypt.compare(password, hashPassword)
                if(isPasswordMatch) {
                    const token = jwt.sign({ user_name, role: data?.role }, ADMIN_SECRET, { expiresIn: '1h' })

                    return res.status(200).json({
                        code: 200,
                        message: 'Login success',
                        accessToken: token,
                        data: data
                    })
                }

                return res.status(400).json({
                    code: 400,
                    message: 'Invalid password'
                })
            }

            return res.status(404).json({
                code: 404,
                message: 'User not found'
            })
        } catch (error: any) {

            return errorResponseHandler(res, error?.message)
        }
    }
}

export default new UserController();