import { config } from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import cors from 'cors';

export const app = express();

config({
    path: './utils/config.env'
});


//using middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true                                  // to send credentials to FE(headers, cookie)
}));

//using routes

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/task', taskRoutes);

app.get('/', (req, res) => {
    res.send('Noice');
});


// using error middlewares

// app.use((err, req, res, next) => {                      // global error handler

//     return res.status(404).json({
//         success: false,
//         message: err.message
//     });
// })

app.use(errorMiddleware);