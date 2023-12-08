import { Request, Response } from "express";
import Customer from "../models/customer";

const Add = async (req: Request, res: Response) => {
    try {
        const check = await Customer.findOne({
            userName: req.body.userName
        })
        if (check)
            return res.status(400).json({
                message: "Existed"
            })
        else {
            const data = await Customer.create(req.body)
            console.log('data: ', data);

            return res.status(200).json({
                message: "Successfully",
                data: data
            })
        }
    } catch (error) {
        console.log('err: ', error);

        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetA = async (req: Request, res: Response) => {
    try {
        const data = await Customer.findById(req.params._id)
        console.log('id: ', req.params._id)
        console.log('data: ', data)

        if (!data)
            return res.status(400).json({
                message: "Invalid"
            })
        else return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetAll = async (req: Request, res: Response) => {
    try {
        const data = await Customer.find()
        res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}
const Update = async (req: Request, res: Response) => {
    try {
        const data = await Customer.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else {
            await data?.updateOne({ $set: req.body })
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}
const Delete = async (req: Request, res: Response) => {
    try {
        const data = await Customer.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else {
            await Customer.findByIdAndDelete(req.params._id)
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const customerController = {
    Add, GetA, GetAll, Update, Delete
}