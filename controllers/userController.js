import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendToken } from "../utils/jwtToken.js";
import { comparePassword } from "../utils/comparePassword.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const getAllUsers = async (req, res) => {
    const users = User.find();

    res.status(200).json({
        success: true,
        users: []
    })
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password')


    // if (!user) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Invalid email or password'
    //     });
    // };

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 400));
    };

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
        // return res.status(403).json({
        //     success: false,
        //     message: 'Invalid email or password'
        // });
        return next(new ErrorHandler('Invalid email or password', 403));
    }

    sendToken(res, user, 'Logged in successfully', 200);
};

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // if (user) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'User already exists'
    //     });
    // }
    if (user) {
        return next(new ErrorHandler('User already exists', 400));
    };


    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    sendToken(res, user, 'Registered Successfully', 201);
};

// export const getMyProfile = async (req, res) => {

//     const { token } = req.cookies;

//     if (!token)
//         return res.status(404).json({
//             success: false,
//             message: 'Sign in first'
//         });

//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decodedData._id);

//     res.status(200).json({
//         success: true,
//         user
//     })
// }


export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};

export const logoutUser = async (req, res, next) => {

    res.status(200)
        .cookie('token', '', {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === 'Development' ? "lax" : "none",
            secure: process.env.NODE_ENV === 'Development' ? false : true
        })
        .json({
            success: true,
            message: 'logged out successfully'
        })
}