import express  from "express";
import {Register} from "../controllers/AuthController.js";
import upload from '../Middlewares/Multer.js'
import {Login} from '../controllers/AuthController.js'

const AuthRoutes = express.Router();
AuthRoutes.post("/register",upload.single('profile'),Register)

AuthRoutes.post('/login',Login)


export default AuthRoutes;