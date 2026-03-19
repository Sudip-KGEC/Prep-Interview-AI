import express from "express";
import cookieParser from "cookie-parser";

/* import all the routes here */
import authRouter from "./routes/auth.routes.js"; 

const app = express();


/* using all the middlewares here */
app.use(express.json());
app.use(cookieParser());



/* using all the routes here */
app.use( "/api/auth" , authRouter);



export default app;