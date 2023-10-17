import { app } from "./app.js";
import { connectDB } from "./utils/database.js";

connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
    );
})