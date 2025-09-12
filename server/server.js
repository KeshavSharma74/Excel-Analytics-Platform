import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./libs/database.js";
import "dotenv/config"

const app=express();
// console.log("lord keshav")
const port = process.env.port || 4000;

app.get('/',(req,res)=>{
    return res.send('Server is live');
})


app.listen(port,()=>{
    console.log('Server is listening at port :',port);
})
dbConnect();