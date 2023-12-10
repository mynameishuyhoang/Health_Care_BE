import { Request, Response } from "express";
import Shipp from "../models/shipp";
import { errorFunction } from "../utils/errorFunction";

const Add = async (req: Request, res: Response) => {
    try {
        const check = await Shipp.findOne({
            shippName: req.body.shippName
        })
        if (check)
            return res.status(400).json({
                message: "Existed"
            })
        const data = await Shipp.create(req.body)
        console.log(req.body);

        res.json(errorFunction(false, 200, 'Successfully', data))
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetA = async (req: Request, res: Response) => {
    try {
        const data = await Shipp.findById(req.params._id)
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
        const data = await Shipp.find()
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
        const data = await Shipp.findById(req.params._id)
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
        const data = await Shipp.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else {
            await Shipp.findByIdAndDelete(req.params._id)
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const shippController = {
    Add, GetA, GetAll, Update, Delete
}