
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

/* import all the routes here */
import authRouter from "./routes/auth.routes.js"; 
import interviewRouter from "./routes/interview.routes.js";

const app = express();


/* using all the middlewares here */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



/* using all the routes here */
app.use( "/api/auth" , authRouter);
app.use( "/api/interview" , interviewRouter);



export default app;