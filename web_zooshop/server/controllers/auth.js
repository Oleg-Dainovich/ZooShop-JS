import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//SignUp
export const register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const isUsed = await User.findOne({ email });

        if (isUsed){
            return res.status(409).json({
                message: "This email is already taken."
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let newUser = new User({
            fullName, 
            email, 
            password: hash,
        });

        await newUser.save();

        res.json({message: "Registration completed successfully"});
        console.log("Registration completed successfully");

    } catch (error) {
        res.json({message: "Error during registration."});
    }
}
//SignIn
export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user){
            return res.status(404).json({
                message: "There is no such user."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect){
            return res.status(404).json({
                message: "Incorrect password."
            })
        }
        
        const token = jwt.sign(
            {
                id: user._id
            },
            'SECRET_KEY',
            { expiresIn: '1000h' },
        );

        res.json({
            token, user, message: "You are logged in.",
        })
    } catch (error) {
        res.status(404).json({message: "Error during authorization."});
    }
}

//GetCurrentUser
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user){
            return res.json({
                message: "There is no such user."
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            'SECRET_KEY',
            { expiresIn: '1000h' },
        );

        res.json({ user, token, });
    } catch (error) {
        res.json({message: "Error during getting user."});
    }
}