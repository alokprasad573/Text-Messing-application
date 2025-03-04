import UserModal from "../models/User.js";
import bcrypt from "bcryptjs";
import * as string_decoder from "node:string_decoder";

export const Register = async(req, res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !password || !email || !req.file){
            return res.status(400).json({
                success:false,
                message: `${!name ? 'Name' : !email ? "Email" : !password ? "Password" : !req.file ? 'Profile is required' : ""} is Required`
            })
        }
        const existUser = await UserModal.findOne({email})
        if (existUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        //BaseUrl
        const BaseUrl = `${req.protocol}://${req.get("host")}`;

        //Image Address
        const imagePath = `${BaseUrl}/images/${req.file.filename}`

        const salt = await  bcrypt.genSaltSync(12);
        const hashedPassword = await bcrypt.hashSync(password.toString(), salt)

        const user = await UserModal.create({
            name,email,password:hashedPassword,profile:imagePath
        })
        await user.save()
        res.status(201).json({
            success:true,
            user,message:"Successfully registered"
        })
    } catch (error) {
        console.log(`Error`,error)
        return res.status(500).json({
            success:false,
        message:"InternalServer Error"
        })
    }
}


export const Login = async(req, res) => {
    try{
        //Asking to enter email and password
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:`${!email ? "Email" : "Password"} is Required`})

        }

        //Checking User Exist Or Not
        const existUser = await UserModal.findOne({email})
        if(!existUser) {
            return res.status(400).json({success:false, message:"User Not Exist"})
        }

        //Checking Password is correct or Not
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            return res.status(400).json({success:false, message:"Invalid Password"})
        } else {
            return res.status(200).json({success:true, message:"User Login Successfully"})
        }
    }

    catch (error) {
       console.log(`Error`,error)
        return res.status(500).json({success:false, message:"InternalServer Error"})
    }
}