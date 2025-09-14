import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./libs/database.js";
import "dotenv/config"
import userRouter from "./routes/user.routes.js";

const app=express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/user',userRouter);

const port = process.env.port || 4000;

app.get('/',(req,res)=>{
    return res.send('Server is live');
})


app.listen(port,()=>{
    console.log('Server is listening at port :',port);
})
dbConnect();