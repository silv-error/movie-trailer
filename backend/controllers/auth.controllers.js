import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({success: false, error: "All fields are required"});
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, error: "Invalid email"});
        }

        if(password.length < 6) {
            return res.status(400).json({success: false, error: "Password must be at least 6 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({success: false, error: "Email is already registered"});
        }

        const existingUsername = await User.findOne({username});
        if(existingUsername) {
            return res.status(400).json({success: false, error: "Username is already registered"});
        }

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image: "/avatar1.png"
        })

        generateTokenAndSetCookie(newUser._id, res);
        
        await newUser.save();

        res.status(200).json({ success: true, user: {
            ...newUser._doc,
            password: ""
        }});
    } catch (error) {
        console.error(`Error in signup controller: ${error.message}`);
        res.status(400).json({success: false, error: "Internal server error"});
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({success: false, error: "Please fill in all fields"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, error: "Invalid credentials"});
        }

        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword) {
            return res.status(400).json({success: false, error: "Invalid credentials"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({success: true, user: {
            ...user._doc,
            password: ""
        }});
    } catch (error) {
        console.error(`Error in signup controller: ${error.message}`);
        res.status(400).json({success: false, error: "Internal server error"});
    }
}

export async function logout(req, res) {
    try {
        res.cookie("jwt-netflix", "", {maxAge: 0});
        res.status(200).json({success: true, message: "Logged out successfully"});
    } catch (error) {
        console.error(`Error in logout controller: ${error.message}`);
        res.status(400).json({success: false, error: "Internal server error"});
    }
}