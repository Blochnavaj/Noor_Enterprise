import express from 'express';
import { UserRegister, UserLogin, UserProfile } from '../Controllers/UserContollers.js';
import protect from '../Middleware/authMiddlware.js'

const UserRoute = express.Router();

//public 
UserRoute.post("/register", UserRegister);
UserRoute.post("/login", UserLogin);
UserRoute.get('/profile', protect, UserProfile);

export default UserRoute;