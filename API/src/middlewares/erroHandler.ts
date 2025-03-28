import { Request, Response, NextFunction } from "express";
import { NetworkError } from '../types'

export default function (err: NetworkError, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack); // We could switch it to a logger library later

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        error: process.env.ENVIRONMENT === 'development' ? err : { }
    });
}