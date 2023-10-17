import jwt from 'jsonwebtoken';


export const sendToken = (res, user, message, statusCode = 200) => {


    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'Development' ? "lax" : "none",
        secure: process.env.NODE_ENV === 'Development' ? false : true
    }).json({
        success: true,
        message
    });

} 