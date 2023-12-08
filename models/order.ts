import mongoose from "mongoose";
import { IOrder } from "../types/order";

const orderSchema = new mongoose.Schema<IOrder>(
    {
        products: [{
            type: Object
        }],
        status: {
            type: Number
        },
        customerId: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema)

export default Order