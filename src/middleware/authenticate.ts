import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

type AuthData = {
    email: string,
    role: string,
    iat: number,
    exp: number
}

interface AuthenticatedToken {
    role:string,
    auth: {
        req:Request,
        res:Response,
        next:NextFunction
    }
}

const authenticateToken = ({role, auth}: AuthenticatedToken) => {
    const {req, res, next} = auth
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Unauthorized
    if (!token) return res.status(401).json({
        code: 401,
        message: 'Token is not provided!'
    }); 

    jwt.verify(token||'', ADMIN_SECRET, (err, authData) => {
        const newAuthData = authData as AuthData
        // Forbidden
        if (err) return res.status(403).json({
            code: 403,
            message: 'Token is not valid!'
        });

        if(newAuthData?.role !== role) return res.status(403).json({
            code: 403,
            message: 'You are not authorized!'
        })
        
        next();
    });
}


export default authenticateToken;