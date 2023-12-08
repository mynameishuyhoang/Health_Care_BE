import { Request, Response } from "express";
import User from "../models/user";

const Add = async (req: Request, res: Response) => {
    try {
        const check = await User.findOne({
            userName: req.body.userName
        })
        if (check) return res.status(400).json({ message: "Existed" })
        else {
            const data = await User.create(req.body)
            return res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

const GetA = async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}

const GetAll = async (req: Request, res: Response) => {
    try {
        const data = await User.find()
        return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

const Update = async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params._id)
        if (!data) return res.status(400).json({
            message: "Invalid"
        })
        else {
            await data?.updateOne({ $set: req.body })
            return res.status(200).json({
                message: "Successfully",
                data: data
            })
        }
    } catch (error) {
        return res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

const Delete = async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params._id)
        if (!data) return res.status(400).json({
            message: "Invalid"
        })
        else {
            await User.findByIdAndDelete(req.params._id)
            return res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const userController = {
    Add, GetA, GetAll, Update, Delete
}