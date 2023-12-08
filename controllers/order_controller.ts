import { Request, Response } from "express";
import Order from "../models/order";

const Add = async (req: Request, res: Response) => {
    try {
        const data = await Order.create(req.body)
        res.status(200).json({
            message: "Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetA = async (req: Request, res: Response) => {
    try {
        const data = await Order.find({ customerId: req.params._id })
        console.log('abc: ', req.params._id);

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
        const data = await Order.find()
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
        const data = await Order.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else {
            await data?.updateOne({ $set: req.body })
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const orderController = {
    Add, GetA, GetAll, Update
}