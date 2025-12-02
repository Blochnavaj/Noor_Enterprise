import userModel from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();


const protect = async (req,res,next) => {
   try {
     // token from header: Authorization: Bearer <token>
     const authHeader = req.headers.authorization || " ";
     const token = authHeader.startsWith('Bearer') ? authHeader.split(" ")[1] : null ; 
 
     if(!token) return res.status(400).json({message : "No token provided, authorization denied"});

     const secert = process.env.JWT_SECRET;
     const decoded = jwt.verify(token, secert);

      // Attach user to request (without password)
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // now controllers can access req.user
    next();

   } catch (error) {
     console.error("authMiddleware error:", err);
    // expired token or invalid token
    return res.status(401).json({ message: "Token is not valid or expired" });
   }
} 


export default protect;