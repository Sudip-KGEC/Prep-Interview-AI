import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */

const registerUserController = async ( req , res ) => {
   
     const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    try {
    
    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
        
    } catch (error) {
        console.error(error)
    }
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */

const loginUserController = async (req , res ) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }

    try {

        const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
        
    } catch (error) {
        console.error(error)
    }

};


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

const logoutUserController = async (req , res ) => {
     const token = req.cookies.token;

     try {
        if (token) {
        await blacklistTokenModel.create({ token });
        res.clearCookie("token")

        res.status(200).json({
        message: "User logged out successfully"
        })
    }
        
     } catch (error) {
        console.error(error)
     }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */

const getMeController = async (req , res ) => {
     const user = await userModel.findById(req.user.id);

       res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


export default {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}