import { Request, Response } from "express";
import Voucher from "../models/voucher";

const Add = async (req: Request, res: Response) => {
    try {
        const check = await Voucher.findOne({
            codeVoucher: req.body.codeVoucher
        })
        if (check)
            return res.status(400).json({
                message: "Existed"
            })
        const data = await Voucher.create(req.body)
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
        const data = await Voucher.findById(req.params._id)
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
        const data = await Voucher.find()
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
        const data = await Voucher.findById(req.params._id)
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
        const data = await Voucher.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else {
            await Voucher.findByIdAndDelete(req.params._id)
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const voucherController = {
    Add, GetA, GetAll, Update, Delete
}