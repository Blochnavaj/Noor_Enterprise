import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/db.js';
import UserRoute from './Router/UserRoute.js';

dotenv.config(); 

const app = express();

//Database cofig
connectDB();


//default middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors()); 

const port = process.env.PORT || 3000;



//api end-point 
app.use("/api/auth", UserRoute);


//server 
app.listen(port, () => console.log(`✅ Server Running on port ${port}`));