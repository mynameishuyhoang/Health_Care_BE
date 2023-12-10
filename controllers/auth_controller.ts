import { Request, Response } from "express";
import Customer from "../models/customer";
import bcrypt from "bcrypt";
import User from "../models/user";

const Register = async (req: Request, res: Response) => {
    try {
        const checkUsername = await Customer.findOne({
            username: req.body.username
        })
        const checkEmai = await Customer.findOne({
            email: req.body.email
        })
        if (checkUsername || checkEmai)
            return res.status(400).json({
                message: "Existed"
            })
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const data = await Customer.create({
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            adult: parseInt(req.body.adult),
            child: parseInt(req.body.child),
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        })

        if (data) {
            res.status(201).json({
                message: "Successfully"
            })
        }
        else {
            res.status(403).json({
                message: "Error"
            })
        }
    } catch (error) {
        console.log('error: ', error);

        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}

const Login = async (req: Request, res: Response) => {
    try {
        const user = await Customer.findOne({
            username: req.body.username
        })
        if (!user) {
            res.status(404).json({
                message: "Wrong username or Username does not existed"
            })
        }
        const password = bcrypt.compare(req.body.password, user.password)
        if (!password) {
            res.status(404).json({
                message: "Wrong password"
            })
        }
        else {
            const { username, password, adult, child, name, phone, email } = user;
            res.status(200).json({
                message: "Successfully",
                _id: user._id,
                name: name,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}

const LoginDasboard = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            useName: req.body.userName
        })
        if (!user) {
            res.status(404).json({
                message: "Wrong username or Username does not existed"
            })
        }
        const password = bcrypt.compare(req.body.password, user.password)
        if (!password) {
            res.status(404).json({
                message: "Wrong password"
            })
        }
        else {
            const { userName, password, name, isAdmin } = user;
            res.status(200).json({
                message: "Successfully",
                _id: user._id,
                name: name,
                isAdmin: isAdmin
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}

export const authController = {
    Register, Login, LoginDasboard
}