/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
type TRes = {
    status: number;
    success: boolean;
    message: string;
    data: any;
}
const sendResponse = (res: Response,data:TRes) =>{
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data
    })
}

export default sendResponse;