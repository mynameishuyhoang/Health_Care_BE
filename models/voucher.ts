import mongoose from "mongoose";
import { IVoucher } from "../types/voucher";
const Schema = mongoose.Schema

const voucherSchema = new mongoose.Schema<IVoucher>(
    {
        codeVoucher: {
            type: String
        },
        title: {
            type: String
        },
        price: {
            type: Number
        },
        amount: {
            type: Number
        },
        startDay: {
            type: Date
        },
        endDay: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

const Voucher = mongoose.model("Voucher", voucherSchema)
export default Voucher