import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    // if (!token)
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Sign in first'
    //     });

    if(!token) {
        return next(new ErrorHandler('Sign in first', 403))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
}